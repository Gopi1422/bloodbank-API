# bloodbank-API

## Backend Assignment - Bloodbank API

Develop a NestJS / ExpressJS REST API server with the following requirements:

1. The app should handle 2 types of users - Hospital, Receiver 
Hospital and Receiver should be able to create an account and sign in (JWT Authentication is used).
2. The hospital should be able to add all the blood samples info available
3. Receivers can be able to request blood samples from hospitals. Make sure that only those receivers who are eligible for the blood sample are allowed to request samples.
4. The hospital should be able to see the list of all receivers who have requested a particular blood group from its blood bank.

Endpoints:
1. GET endpoint to get the list of all blood samples available in all hospitals (Public - Everyone can access)
2. POST endpoint to add the blood sample info (Only accessible to respective hospital)
3. PUT endpoint to update the respective blood info (Only accessible to respective hospital)
4. DELETE endpoint to delete the respective blood info (Only accessible to respective hospital)
5. GET endpoint to get all the blood info that the hospital uploaded (Only accessible to respective hospital)
6. POST Endpoint to request a blood sample (Only accessible to receiver)
7. GET endpoint to get the list of all receivers who have requested a particular blood group from its blood bank (Only accessible to respective hospital)
8. POST endpoint to add the blood bank info (Only accessible to respective hospital)
9. GET endpoint to get all the blood bank that the hospital uploaded (Only accessible to respective hospital)

## Run Locally

1. Fork this repository to your github account
2. Clone the forked repository and proceed with steps mentioned below
3. Install requirements
```
npm install
```
4. Start development server
```
npm run dev
```

## Available APIs

### Auth - JWT Token
- header: "Authorization"
- value: Bearer <token>

#### Public API  
  
#### POST /register

Register User with its Role
```
payload:
{
    "name": "testR1",
    "email": "testr1@gmail.com",
    "password": "Test@1234",
    "address": "address",
    "city": "city",
    "roles": {
        "Receiver": "RECEIVER"
    },
    "is_eligible": true
}

response:
{
    "name": "testR1",
    "address": "address",
    "city": "city",
    "email": "testr1@gmail.com",
    "password": "$2a$10$4WsMTSFBbZAjmf0vm2Eu/ud9Il7iq2h20IJF/XfK1dAZ2vGKsL6ia",
    "roles": [
        "RECEIVER"
    ],
    "is_active": true,
    "is_eligible": true,
    "_id": "63e23bdb173f5a5789963a0f",
    "__v": 0
}
```


#### POST /login

Login User
```
headers:
Authorization: Bearer Token

payload:
{
    "email": "testr1@gmail.com",
    "password": "Test@1234",
}

response:
{
    "user": {
        "name": "testR1",
        "address": "address",
        "city": "city",
        "email": "testr1@gmail.com",
        "password": "$2a$10$4WsMTSFBbZAjmf0vm2Eu/ud9Il7iq2h20IJF/XfK1dAZ2vGKsL6ia",
        "roles": [
            "RECEIVER"
        ],
        "is_active": true,
        "is_eligible": true,
        "_id": "63e23bdb173f5a5789963a0f",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2luZm8iOnsidXNlcl9pZCI6IjYxZTIzYmRiMTczZjVhNTc4rTk2M2EwZiIsImVtYWlsIjoigGVzdHJuMkBnbWFpbC5sb20ifSwicm9sZXMiOlsiUkVDRUlWRVIiXSwiaWF0IjoxNjc1NzcxNzAyLCJleHAiOjE2NzU3Nzg5MDJ9.yeJ2FRdSwVwFxFjqPge2egnhn1iJ0BuPS1itVjmvqBo"
}
```
  
#### GET /bloodSamples

Get all blood samples of all hospital which are available (Public Access)
```
response:
{
    "blood_sample": [
        {
            "_id": "63e23cc6adfbcc8433e3285d",
            "blood_group": "O+",
            "quantity_in_ml": 100,
            "bag_no": "4",
            "status": "Available",
            "date_of_donation": "2002-02-11T00:00:00.000Z",
            "donor": "63e23c99adfbcc8433e32853",
            "hospital": "63e23944173f5a57899639ca",
            "blood_bank": "63e23a51173f5a57899639e4",
            "__v": 0
        },
        {
            "_id": "63e23c9aadfbcc8433e32855",
            "blood_group": "A+",
            "quantity_in_ml": 200,
            "bag_no": "3",
            "status": "Available",
            "date_of_donation": "2002-02-11T00:00:00.000Z",
            "donor": "63e23c99adfbcc8433e32853",
            "hospital": "63e23962173f5a57899639cd",
            "blood_bank": "63e23a5f173f5a57899639e7",
            "__v": 0
        }
    ]
}

### Hospital API
  
#### POST /hospital/addBloodBank

Add Blood Bank (Only Accessible to respective hospital)
```
headers:
Authorization: Bearer Token

payload:
{
    "name": "BL1H1",
    "contact_no": "9646165416",
    "address": "address",
    "city": "city"
}

response:
{
    "blood_bank": {
        "name": "BL1H1",
        "contact_no": "9646165416",
        "address": "address",
        "city": "city",
        "hospital": [
            "63e23962173f5a57899639cd"
        ],
        "_id": "63e23a5f173f5a57899639e7",
        "__v": 0
    }
}
```
  
#### GET /hospital/getBloodBanks

Returns list of all Blood Banks (Only Accessible to respective hospital)
```
headers:
Authorization: Bearer Token

response:
{
    "blood_bank": [{
        "name": "BL1H1",
        "contact_no": "9646165416",
        "address": "address",
        "city": "city",
        "hospital": [
            "63e23962173f5a57899639cd"
        ],
        "_id": "63e23a5f173f5a57899639e7",
        "__v": 0
    }]
}
```
  
#### POST /hospital/addBloodSamples

Add Blood Sample Information (Only Accessible to respective hospital)
```
headers:
Authorization: Bearer Token

payload:
{
    "blood_group": "O+",
    "quantity_in_ml": 100,
    "bag_no": "4",
    "blood_bank_name": "BL1H1",
    "dname": "TestDN",
    "dgender": "Male",
    "dage": "32",
    "dcontact_no": "9646548616",
    "demail": "testd@gmail.com",
    "daddress": "address",
    "date_of_donation": "2002-02-11",
    "status": "Available"
}

response:
{
    "blood_sample": {
        "blood_group": "O+",
        "quantity_in_ml": 100,
        "bag_no": "4",
        "status": "Used",
        "date_of_donation": "2002-02-11T00:00:00.000Z",
        "donor": "63e23c99adfbcc8433e32853",
        "hospital": "63e23962173f5a57899639cd",
        "blood_bank": "63e23a5f173f5a57899639e7",
        "_id": "63e23cc6adfbcc8433e3285d",
        "__v": 0
    },
    "donor": {
        "_id": "63e23c99adfbcc8433e32853",
        "dname": "TestDN",
        "dcontact_no": "9646548616",
        "daddress": "address",
        "dgender": "Male",
        "dage": 32,
        "demail": "testd@gmail.com",
        "__v": 0
    }
}
```
  
#### GET /hospital/getBloodSamples

Get Blood Sample Information uploaded by respective hospital (Only Accessible to respective hospital)
```
headers:
Authorization: Bearer Token

response:
{
    "blood_sample": [
        {
            "_id": "63e23cc6adfbcc8433e3285d",
            "blood_group": "O+",
            "quantity_in_ml": 100,
            "bag_no": "4",
            "status": "Used",
            "date_of_donation": "2002-02-11T00:00:00.000Z",
            "donor": {
                  "_id": "63e23c99adfbcc8433e32853",
                  "dname": "TestDN",
                  "dcontact_no": "9646548616"
              },
            "hospital": "63e23962173f5a57899639cd",
            "blood_bank": {
                  "_id": "63e23a5f173f5a57899639e7",
                  "name": "BL1H1"
              },
            "__v": 0
        }
    ]
}
```

#### PUT /hospital/bloodSample/63e23cc6adfbcc8433e3285d

Update Blood Sample Information (Only Accessible to respective hospital)
```
headers:
Authorization: Bearer Token

payload:
{
    "quantity_in_ml": 200,
    "bag_no": "4",
    "dname": "TestDNO",
    "dage": "33",
    "dcontact_no": "9756548616",
    "demail": "testdno@gmail.com",
    "status": "Used"
}

response:
{
    "blood_sample": {
        "blood_group": "O+",
        "quantity_in_ml": 200,
        "bag_no": "4",
        "status": "Used",
        "date_of_donation": "2002-02-11T00:00:00.000Z",
        "donor": "63e23c99adfbcc8433e32853",
        "hospital": "63e23962173f5a57899639cd",
        "blood_bank": "63e23a5f173f5a57899639e7",
        "_id": "63e23cc6adfbcc8433e3285d",
        "__v": 0
    },
    "donor": {
        "_id": "63e23c99adfbcc8433e32853",
        "dname": "TestDNO",
        "dcontact_no": "9756548616",
        "dgender": "Male",
        "dage": 33,
        "demail": "testdno@gmail.com",
        "__v": 0
    }
}
```

  
#### DELETE /hospital/bloodSample/63e23cc6adfbcc8433e3285d

Update Blood Sample Information (Only Accessible to respective hospital)
```
headers:
Authorization: Bearer Token

response:
{
    "deletedInfo": {
        "_id": "63e23cc6adfbcc8433e3285d",
        "blood_group": "O+",
        "quantity_in_ml": 200,
        "bag_no": "4",
        "status": "Used",
        "date_of_donation": "2002-02-11T00:00:00.000Z",
        "donor": "63e23c99adfbcc8433e32853",
        "hospital": "63e23962173f5a57899639cd",
        "blood_bank": "63e23a5f173f5a57899639e7",
        "__v": 0
    }
}
```
  
#### GET /hospital/receiverRequests

Get receiver requests for respective hospital (Only Accessible to respective hospital)
```
headers:
Authorization: Bearer Token

response:
{
    "receiverRequests": [
        {
            "_id": "63e23d5dadfbcc8433e3286b",
            "blood_group": "O-",
            "quantity_in_ml": 100,
            "date_of_request": "2023-02-07T00:00:00.000Z",
            "date_of_reception": null,
            "status": "requested",
            "hospital": "63e23962173f5a57899639cd",
            "receiver": {
                "_id": "63e23bdb173f5a5789963a0f",
                "name": "testR1",
                "address": "address",
                "city": "city",
                "email": "testr1@gmail.com"
            },
            "__v": 0
        }
    ]
}
```

### Receiver API
  
#### POST /receiver/requestBloodSamples

Request Blood Samples (Only Accessible to respective receiver)
```
headers:
Authorization: Bearer Token

payload:
{
    "blood_group": "O+",
    "quantity_in_ml": 100,
    "hospital": "63e23962173f5a57899639cd",
    "date_of_request": "2023-02-07"
}

response:
{
    "data": {
        "blood_group": "O-",
        "quantity_in_ml": 100,
        "date_of_request": "2023-02-07T00:00:00.000Z",
        "date_of_reception": null,
        "status": "Requested",
        "hospital": "63e23962173f5a57899639cd",
        "receiver": "63e23bdb173f5a5789963a0f",
        "_id": "63e23d5dadfbcc8433e3286b",
        "__v": 0
    },
    "message": "Request is sent to the hospital."
}
```
