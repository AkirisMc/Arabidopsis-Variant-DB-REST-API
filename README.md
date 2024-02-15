# Arabidopsis-Variant-DB-REST-API
 A relational database for storing variant information from VCF files of different *Arabidopsis thaliana* strains and a REST API service for convenient access to this information.

## Database
The SQLite (v3.34.1) engine was employed to establish a relational database, aiming to store critical data extracted from VCF (v4.1) files originating from different *Arabidopsis thaliana* strains. The database was designed with a straightforward structure to streamline both data population and query processes.

<p align="center">
<img src="https://github.com/AkirisMc/Arabidopsis-Variant-DB-REST-API/blob/main/Images/Database_ER_diagram.jpg" width="450">
</p>

The structure of the database is made up of two tables, the *Datasets* table and the *Variants* table. 

The *Datasets* table includes the unique identifiers for the genomes featured in each file (e.g. *7208*) labeled as **genome**, along with the full file names (e.g. *genome_7208.vcf*) labeled as **dataset**.

| **genome**      | **dataset**                   |
| :-------------: | :---------------------------: |
| 7208            | genome_7208.vcf               |
| 8233            | genome_8233.vcf               |
| 9968            | genome_9968.vcf               |

The *Variants* table contains eight attributes which represent the information present in the columns of a VCF file. 

To streamline the data and retain essential information, the values typically found in the *ID*, *FILTER*, and *FORMAT* columns were omitted, including only the genotype data (e.g. *1|1*) from the final column of the VCF files.

An identifying attribute, designated as **id**, was introduced as an incremental integer to uniquely identify each row.

| **id**     | **genome**   | **chromosome**   | **position**  | **reference**   | **alternate** | **quality**   | **read depth** | **genotype**  | 
| :----: | :------: | :--------:   | :-------: | :-------:   | :-------: | :-------: | :--------: | :-------: |
| 1      | 7208     | 1            | 6324      | T           | TA        | 40        | 104        | 1|1       |
| 2      | 7208     | 1            | 214644    | A           | AT        | 40        | 39         | 1|1       |
| 3      | 7208     | 1            | 851442    | T           | TA        | 40        | 135        | 1|1       |

**Note:** The database ([database.sqlite](https://github.com/AkirisMc/Arabidopsis-Variant-DB-REST-API/blob/main/Database/database.sqlite)) has already been populated with the input data.  In order to create a database with information from different VCF files, an empty SQLite database needs to be created using the [schema.sql](https://github.com/AkirisMc/Arabidopsis-Variant-DB-REST-API/blob/main/Database/schema.sql) file.

## Importing the data

## Server 

## Server deployment 

## REST endpoints 

