/*
router.js is the modular router which handles the requests of the user. 
Akiris Moctezuma - s394901
*/

const express = require('express'); // loading the Express dependency
const sqlite3 = require('sqlite3').verbose(); // loading the sqlite package 

const db_router = express.Router(); // creating a router 


// adding a middleware function to log all requests
db_router.use(function (req, res, next) {
    console.log('Received request');
    next();
});

// adding one endpoint for testing 
db_router.get('/test', function (req, res) {
    res.send('request was successfully received and response was successfully sent');
});


// establishing a connection with the database and creating an object to interact with the database 
const db = new sqlite3.Database('./database.sqlite'); 


/////// listing the name of the VCF files ///////

// endpoint that displays the datasets 
db_router.get('/datasets', function (req, res) {
    const query = 'SELECT dataset FROM datasets;';
    db.all(query, [], function (err, rows) {
        if (err) {
            throw err;
        }
        const array = []
        for (let i = 0; i < rows.length; i++) {
            array.push(rows[i].dataset);
        }
        res.send(array);       
    });
});


//////// listing the number of variants //////////

// endpoint that counts the number of SNPs per chromosome given a genome
db_router.get('/numbervariants/snps/:genome', function (req, res) {
    const query = 'SELECT COUNT(*) FROM variants WHERE LENGTH(reference) = LENGTH(alternate) AND genome = ? AND chromosome = "1" UNION ALL ' +
                  'SELECT COUNT(*) FROM variants WHERE LENGTH(reference) = LENGTH(alternate) AND genome = ? AND chromosome = "2" UNION ALL ' +   
                  'SELECT COUNT(*) FROM variants WHERE LENGTH(reference) = LENGTH(alternate) AND genome = ? AND chromosome = "3" UNION ALL ' +
                  'SELECT COUNT(*) FROM variants WHERE LENGTH(reference) = LENGTH(alternate) AND genome = ? AND chromosome = "4" UNION ALL ' +
                  'SELECT COUNT(*) FROM variants WHERE LENGTH(reference) = LENGTH(alternate) AND genome = ? AND chromosome = "5";';
    const parameters = [
        req.params.genome,
        req.params.genome,        
        req.params.genome,
        req.params.genome,
        req.params.genome
    ];
    db.all(query, parameters, function (err, rows) {
        if (err) {
            throw err;
        }

        let count1 = Object.values(rows[0]).toString();
        let count2 = Object.values(rows[1]).toString();
        let count3 = Object.values(rows[2]).toString();
        let count4 = Object.values(rows[3]).toString();
        let count5 = Object.values(rows[4]).toString();

        res.json({
            chromosome1: count1,
            chromosome2: count2,
            chromosome3: count3,
            chromosome4: count4,
            chromosome5: count5
        });
    });
});

// endpoint that counts the number of InDels per chromosome given a genome
db_router.get('/numbervariants/indels/:genome', function (req, res) {
    const query = 'SELECT COUNT(*) FROM variants WHERE LENGTH(reference) != LENGTH(alternate) AND genome = ? AND chromosome = "1" UNION ALL ' +
                  'SELECT COUNT(*) FROM variants WHERE LENGTH(reference) != LENGTH(alternate) AND genome = ? AND chromosome = "2" UNION ALL ' +   
                  'SELECT COUNT(*) FROM variants WHERE LENGTH(reference) != LENGTH(alternate) AND genome = ? AND chromosome = "3" UNION ALL ' +
                  'SELECT COUNT(*) FROM variants WHERE LENGTH(reference) != LENGTH(alternate) AND genome = ? AND chromosome = "4" UNION ALL ' +
                  'SELECT COUNT(*) FROM variants WHERE LENGTH(reference) != LENGTH(alternate) AND genome = ? AND chromosome = "5";';
    const parameters = [
        req.params.genome,
        req.params.genome,        
        req.params.genome,
        req.params.genome,
        req.params.genome
    ];
    db.all(query, parameters, function (err, rows) {
        if (err) {
            throw err;
        }

        let count1 = Object.values(rows[0]).toString();
        let count2 = Object.values(rows[1]).toString();
        let count3 = Object.values(rows[2]).toString();
        let count4 = Object.values(rows[3]).toString();
        let count5 = Object.values(rows[4]).toString();

        res.json({
            chromosome1: count1,
            chromosome2: count2,
            chromosome3: count3,
            chromosome4: count4,
            chromosome5: count5
        });
    });
});

// endpoint that counts the number of all the variants per chromosome given a genome 
db_router.get('/numbervariants/both/:genome', function (req, res) {
    const query = 'SELECT COUNT(*) FROM variants WHERE genome = ? AND chromosome = "1" UNION ALL ' +
                  'SELECT COUNT(*) FROM variants WHERE genome = ? AND chromosome = "2" UNION ALL ' +
                  'SELECT COUNT(*) FROM variants WHERE genome = ? AND chromosome = "3" UNION ALL ' +
                  'SELECT COUNT(*) FROM variants WHERE genome = ? AND chromosome = "4" UNION ALL ' +
                  'SELECT COUNT(*) FROM variants WHERE genome = ? AND chromosome = "5";';
    const parameters = [
        req.params.genome,
        req.params.genome,        
        req.params.genome,
        req.params.genome,
        req.params.genome
    ];
    db.all(query, parameters, function (err, rows) {
        if (err) {
            throw err;
        }

        let count1 = Object.values(rows[0]).toString();
        let count2 = Object.values(rows[1]).toString();
        let count3 = Object.values(rows[2]).toString();
        let count4 = Object.values(rows[3]).toString();
        let count5 = Object.values(rows[4]).toString();

        res.json({
            chromosome1: count1,
            chromosome2: count2,
            chromosome3: count3,
            chromosome4: count4,
            chromosome5: count5
        });
    });
});


/////// listing the variants ////////

// endpoint that displays all the SNPs given a genome, a chromosome, and the start and end positions
db_router.get('/listvariants/snps/:genome/:chrom/:startpos/:endpos', function (req, res) {
    const query = 'SELECT * FROM variants WHERE LENGTH(reference) = LENGTH(alternate) ' +
                  'AND genome = ? AND chromosome = ? AND position >= ? AND position <= ?;';
    const parameters = [
        req.params.genome,
        req.params.chrom,        
        req.params.startpos,
        req.params.endpos
    ];
    db.all(query, parameters, function (err, rows) {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

// endpoint that displays all the InDels given a genome, a chromosome, and the start and end positions
db_router.get('/listvariants/indels/:genome/:chrom/:startpos/:endpos', function (req, res) {
    const query = 'SELECT * FROM variants WHERE LENGTH(reference) != LENGTH(alternate) ' +
                  'AND genome = ? AND chromosome = ? AND position >= ? AND position <= ?;';
    const parameters = [
        req.params.genome,
        req.params.chrom,        
        req.params.startpos,
        req.params.endpos
    ];
    db.all(query, parameters, function (err, rows) {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

// endpoint that displays all the variants given a genome, a chromosome, and the start and end positions
db_router.get('/listvariants/both/:genome/:chrom/:startpos/:endpos', function (req, res) {
    const query = 'SELECT * FROM variants WHERE genome = ? AND chromosome = ? AND position >= ? AND position <= ?;';
    const parameters = [
        req.params.genome,
        req.params.chrom,        
        req.params.startpos,
        req.params.endpos
    ];
    db.all(query, parameters, function (err, rows) {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
}); 


///////// calculating the variant density ///////////

// endpoint that calculates the variant density given a genome, a chromosome, and the size of a window
//db_router.get('/variantdensity/both/:genome/:chrom/:window', function (req, res) {
//    const query = 'SELECT * FROM variants WHERE genome = ? AND chromosome = ?;';
//    const parameters = [
//        req.params.genome,
//        req.params.chrom
//    ];
//    db.all(query, parameters, function (err, rows) {
//        if (err) {
//            throw err;
//        }
//        const positions = {
//            position: rows.map(row => row.position),
//        }
//        let count = 0;
//        let countvar = 0;
//        let densities = [];
//        let windowsz = 100000;
//        for (let values in Object.values(positions)) {
//            countvar++
//            if (values % windowsz === 0) {
//                densities.push(count);
//                countvar = 0;
//            }
//        }
//
//        res.send(densities);
//
//    });
//}); 




///////// extra functionalities ////////////

// endpoint that calculates the sample quality average of SNPs per chromosome given a genome
db_router.get('/avquality/snps/:genome', function (req, res) {
    const query = 'SELECT AVG(quality) FROM variants WHERE LENGTH(reference) = LENGTH(alternate) AND genome = ? AND chromosome = "1" UNION ALL ' +
                  'SELECT AVG(quality) FROM variants WHERE LENGTH(reference) = LENGTH(alternate) AND genome = ? AND chromosome = "2" UNION ALL ' +   
                  'SELECT AVG(quality) FROM variants WHERE LENGTH(reference) = LENGTH(alternate) AND genome = ? AND chromosome = "3" UNION ALL ' +
                  'SELECT AVG(quality) FROM variants WHERE LENGTH(reference) = LENGTH(alternate) AND genome = ? AND chromosome = "4" UNION ALL ' +
                  'SELECT AVG(quality) FROM variants WHERE LENGTH(reference) = LENGTH(alternate) AND genome = ? AND chromosome = "5";';
    const parameters = [
        req.params.genome,
        req.params.genome,        
        req.params.genome,
        req.params.genome,
        req.params.genome
    ];
    db.all(query, parameters, function (err, rows) {
        if (err) {
            throw err;
        }

        let decimalPlaces = 2;
        let avqual1 = Number(Object.values(rows[0])).toFixed(decimalPlaces);      
        let avqual2 = Number(Object.values(rows[1])).toFixed(decimalPlaces);                   
        let avqual3 = Number(Object.values(rows[2])).toFixed(decimalPlaces);       
        let avqual4 = Number(Object.values(rows[3])).toFixed(decimalPlaces);
        let avqual5 = Number(Object.values(rows[4])).toFixed(decimalPlaces);

        res.json({
            chromosome1: avqual1,
            chromosome2: avqual2,
            chromosome3: avqual3,
            chromosome4: avqual4,
            chromosome5: avqual5
        });
    });
});

// endpoint that calculates the sample quality average of InDels per chromosome given a genome
db_router.get('/avquality/indels/:genome', function (req, res) {
    const query = 'SELECT AVG(quality) FROM variants WHERE LENGTH(reference) != LENGTH(alternate) AND genome = ? AND chromosome = "1" UNION ALL ' +
                  'SELECT AVG(quality) FROM variants WHERE LENGTH(reference) != LENGTH(alternate) AND genome = ? AND chromosome = "2" UNION ALL ' +   
                  'SELECT AVG(quality) FROM variants WHERE LENGTH(reference) != LENGTH(alternate) AND genome = ? AND chromosome = "3" UNION ALL ' +
                  'SELECT AVG(quality) FROM variants WHERE LENGTH(reference) != LENGTH(alternate) AND genome = ? AND chromosome = "4" UNION ALL ' +
                  'SELECT AVG(quality) FROM variants WHERE LENGTH(reference) != LENGTH(alternate) AND genome = ? AND chromosome = "5";';
    const parameters = [
        req.params.genome,
        req.params.genome,        
        req.params.genome,
        req.params.genome,
        req.params.genome
    ];
    db.all(query, parameters, function (err, rows) {
        if (err) {
            throw err;
        }

        let decimalPlaces = 2;
        let avqual1 = Number(Object.values(rows[0])).toFixed(decimalPlaces);      
        let avqual2 = Number(Object.values(rows[1])).toFixed(decimalPlaces);                   
        let avqual3 = Number(Object.values(rows[2])).toFixed(decimalPlaces);       
        let avqual4 = Number(Object.values(rows[3])).toFixed(decimalPlaces);
        let avqual5 = Number(Object.values(rows[4])).toFixed(decimalPlaces);

        res.json({
            chromosome1: avqual1,
            chromosome2: avqual2,
            chromosome3: avqual3,
            chromosome4: avqual4,
            chromosome5: avqual5
        });
    });
});

// endpoint that calculates the sample quality average of all the variants per chromosome given a genome 
db_router.get('/avquality/both/:genome', function (req, res) {
    const query = 'SELECT AVG(quality) FROM variants WHERE genome = ? AND chromosome = "1" UNION ALL ' +
                  'SELECT AVG(quality) FROM variants WHERE genome = ? AND chromosome = "2" UNION ALL ' +
                  'SELECT AVG(quality) FROM variants WHERE genome = ? AND chromosome = "3" UNION ALL ' +
                  'SELECT AVG(quality) FROM variants WHERE genome = ? AND chromosome = "4" UNION ALL ' +
                  'SELECT AVG(quality) FROM variants WHERE genome = ? AND chromosome = "5";';
    const parameters = [
        req.params.genome,
        req.params.genome,        
        req.params.genome,
        req.params.genome,
        req.params.genome
    ];
    db.all(query, parameters, function (err, rows) {
        if (err) {
            throw err;
        }

        let decimalPlaces = 2;
        let avqual1 = Number(Object.values(rows[0])).toFixed(decimalPlaces);      
        let avqual2 = Number(Object.values(rows[1])).toFixed(decimalPlaces);                   
        let avqual3 = Number(Object.values(rows[2])).toFixed(decimalPlaces);       
        let avqual4 = Number(Object.values(rows[3])).toFixed(decimalPlaces);
        let avqual5 = Number(Object.values(rows[4])).toFixed(decimalPlaces);

        res.json({
            chromosome1: avqual1,
            chromosome2: avqual2,
            chromosome3: avqual3,
            chromosome4: avqual4,
            chromosome5: avqual5
        });
    });
});



module.exports = db_router; // exporting the router 