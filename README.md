## Step to running project
- Install the dependencies by type "npm install" in the terminal
- create .env file by copy the .env.example file or type "cp .env.example .env" on the terminal
- create mongodb database named "test_mongodb_bestada_parkir"
- running the project by type "npm start" on the terminal
- create block, slot, and car seeder by hit the seeder endpoint throughth postman or nother data injector
- block-seed end point http://localhost:7000/api/block/block-seed
- slot-seed end point http://localhost:7000/api/slot/slot-seed
- car-seed end point http://localhost:7000/api/car/car-seed   
- do testing to parking the vehicle
- for testing you can see the available slot by hit endpoint http://localhost:7000/api/parking/available
- then you can create the parking position on available slot by hit endpoint http://localhost:7000/api/parking/create
- make sure the slot was free and the car exists
- you can leave the parking by hit the http://localhost:7000/api/parking/destroy/parking_id=:parking_id
