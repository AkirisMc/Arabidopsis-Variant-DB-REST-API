# Arabidopsis-Variant-DB-REST-API
 A relational database for storing variant information from VCF files of different *Arabidopsis thaliana* strains and a REST API service for convenient access to this information.

## Database
The SQLite (v3.34.1) engine was employed to establish a relational database, aiming to store critical data extracted from VCF (v4.1) files originating from different *Arabidopsis thaliana* strains. The database was designed with a straightforward structure to streamline both data population and query processes.

<p align="center">
<img src="https://github.com/AkirisMc/Arabidopsis-Variant-DB-REST-API/blob/main/Images/Database_ER_diagram.jpg" width="450">
</p>

The structure of the database is made up of two tables, the *Datasets* table and the *Variants* table. 

The *Datasets* table includes the unique identifiers for the genomes featured in each file (e.g. *7208*) labeled as **genome**, along with the full filenames (e.g. genome_7208.vcf) labeled as **dataset**.

| Genome      | Dataset                   |
| :---------: | :-----------------------: |
| 7208        | genome_7208.vcf           |
| 8233        | genome_8233.vcf           |
| 9968        | genome_9968.vcf           |

## Importing the data

## Server 

## Server deployment 

## REST endpoints 

