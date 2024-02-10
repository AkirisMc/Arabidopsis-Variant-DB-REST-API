-- schema.sql contains the table schemas of the database (database.sqlite) 
-- Akiris Moctezuma - s394901


-- enforcing foreign key constraints 
PRAGMA foreign_keys = true;

-- creating a table to store information of the datasets (file names and genomes)
DROP TABLE IF EXISTS datasets;
CREATE TABLE IF NOT EXISTS datasets (

  genome INTEGER NOT NULL,
  dataset TEXT NOT NULL,
  PRIMARY KEY (genome)

);

-- creating a table to store information of the variants (id, genome, chrom, pos, ref, alt, qual, info, format)
DROP TABLE IF EXISTS variants;
CREATE TABLE IF NOT EXISTS variants (
    
  id INTEGER NOT NULL,
  genome INTEGER NOT NULL,
  chromosome INTEGER NOT NULL,
  position INTEGER NOT NULL,
  reference TEXT NOT NULL,
  alternate TEXT NOT NULL,
  quality INTEGER NOT NULL,
  read_depth INTEGER NOT NULL,
  genotype TEXT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (genome)
    REFERENCES datasets (genome)

);