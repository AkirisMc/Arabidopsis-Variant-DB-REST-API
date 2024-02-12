"""
dataimport_tool.py parses VCF files and populates a database(database.sqlite)

This script needs to be excecuted from the terminal following the structure:
    python dataimport_tool.py file1.vcf file2_name.vcf file3_name.vcf 

The script, the VCF files and the database file need to be in the same dir and the user needs to be located in that dir before
successfully executing the program 
Akiris Moctezuma - s394901
"""

import argparse
import os
import sqlite3


# creating a variable to hold the input information from the command line
parser = argparse.ArgumentParser(
    description = """This script parses three VCF files and populates a SQLite database"""
)
# adding argument to parse a variable number of VCF files
parser.add_argument(
    "files", nargs="+", type=str, help="the name of the VCF files"
)


# saving the input arguments to an object 
args = parser.parse_args()
# saving the name of the VCF files to a variable 
files = args.files
# declaring the name of the database file 
database = "database.sqlite"


# establishing a connection with the database 
conn = sqlite3.connect(database)
# creating an object that will allow the excecution of SQL commands to modify the database 
cursor = conn.cursor() 


# creating a function that parses each VCF file and populates the variants table with the files content  
def insert_variants(file, genome_id, id):
    with open(file, "r") as vcf:
        for line in vcf:
            if line.startswith("#"):
                continue

            genome = genome_id
            columns = line.strip().split("\t")
            chrom = columns[0]
            pos = columns[1]
            ref = columns[3]
            alt = columns[4]
            qual = columns[5]
            info = columns[7].split("=")
            dp = info[1]
            samp_info = columns[9].split(":")
            gt = samp_info[0]
            cursor.execute(
                f'INSERT INTO variants VALUES({id}, {genome}, {chrom}, {pos}, "{ref}", "{alt}", {qual}, {dp}, "{gt}");'
            )
            id += 1
    return id 


# initialising the id variable that will increment +1 with each row addition 
id = 1 
# populating the tables with the content of each file 
for file in files:
    genome_id = file[7:11] # saving just the genome name that is inside of the name of the VCF files
    cwd = os.getcwd()
    file_path = cwd + "/" + file
    cursor.execute(
        f'INSERT INTO datasets VALUES("{genome_id}", "{file}");' # populating the datasets table 
    )
    id = insert_variants(file_path, genome_id, id) # populating the variants table


# terminating and closing the interaction with the database 
conn.commit()
conn.close()






