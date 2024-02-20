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
The database was populated using the Python script [dataimport_tool.py](https://github.com/AkirisMc/Arabidopsis-Variant-DB-REST-API/blob/main/dataimport_tool.py). The program takes the names of VCF files as command-line arguments, parsing each file and populating the database tables accordingly. It is designed to handle a variable number of VCF files.

To run the program, users just need to enter the name of the VCF files whose content they want to be uploaded to the database.

```python dataimport_tool.py file1.vcf file2_name.vcf file3_name.vcf```  

**Note:** For successful execution of the program, ensure that the script, the VCF files, and the database file are located in the same directory. 

## Server 
A RESTful web service was created using the *Node.js* environment and the *Express.js* framework to enable users to programmatically retrieve and interact with data stored in the variant database.

In the [server.js](https://github.com/AkirisMc/Arabidopsis-Variant-DB-REST-API/blob/main/Server/server.js) script the *Express* dependency is loaded, an object is instantiated using the ```express()``` method, and subsequently, an HTTP server is launched to listen for requests on ```port 3000```. 

A router ([router.js](https://github.com/AkirisMc/Arabidopsis-Variant-DB-REST-API/blob/main/Server/router.js)) was created to organise and modularise the handling of different API endpoints, which was later imported into *server.js* and linked to the API path.

## Server deployment 
Users need to deploy the server first in order to interact with the database. To deploy the server, the content of this repository needs to be cloned on your device. 
```
git clone https://github.com/AkirisMc/Arabidopsis-Variant-DB-REST-API.git
cd Arabidopsis-Variant-DB-REST-API.git
```
Users then should navigate to the **Server** directory, which includes the *server.js* file along with other associated files. To deploy the server, execute the *server.js* file in the terminal.
```
cd Server
node server.js
```
Upon successful deployment, users should observe the following message displayed in the terminal:

```Application deployed on port 3000```

## API endpoints 
To access data from the database, users must utilise the REST API endpoints through URL extensions. Various endpoints were created to enable users the access of different types of data from the variant database, which is provided in *JSON* format.

This example shows how to test the server via URL to check whether it is capable of receiving requests and sending responses. Users just need to type the following URL on their browser:

```http://localhost:3000/api/test```

The following message should be displayed on the browser:

```request was successfully received and response was successfully sent```

