"""
dataimport_tool.py parses three VCF files and populates a database(database.sqlite)
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
    description = """This script parses three VCF files and populates a sqlite database"""
)
# adding compulsory arguments to parse the VCF files 
# first input file 
parser.add_argument(
    "file1", type = str, 
    help = "the name of the first VCF file"
)
# second input file
parser.add_argument(
    "file2", type = str, 
    help = "the name of the second VCF file"
)
# third input file 
parser.add_argument(
    "file3", type = str, 
    help = "the name of the third VCF file"
)


# saving the input arguments to an object 
args = parser.parse_args()
# saving the name of the VCF files to variables 
file1 = args.file1
file2 = args.file2
file3 = args.file3
# declaring the name of the database file 
database = "database.sqlite"

# establishing a connection with the database 
conn = sqlite3.connect(database)
# creating an object that will allow the excecution of SQL commands to modify the database 
cursor = conn.cursor() 


## populating the datasets table 

# saving just the genome name that is inside of the name of the VCF files
genome1 = file1[7:11] 
genome2 = file2[7:11]
genome3 = file3[7:11]

cursor.execute(
    f'INSERT INTO datasets VALUES({genome1}, "{file1}");'
)
cursor.execute(
    f'INSERT INTO datasets VALUES({genome2}, "{file2}");'
)
cursor.execute(
    f'INSERT INTO datasets VALUES({genome3}, "{file3}");'
)


## populating the variants table

# saving the path of the current working dir
cwd = os.getcwd() 
# saving the path of the files to variables
file1 = cwd + "/" + file1
file2 = cwd + "/" + file2
file3 = cwd + "/" + file3

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
# populating the table with the content of each file 
id = insert_variants(file1, genome1, id)
id = insert_variants(file2, genome2, id)
id = insert_variants(file3, genome3, id)


# terminating and closing the interaction with the database 
conn.commit()
conn.close()






