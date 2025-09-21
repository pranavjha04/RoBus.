DROP DATABASE IF EXISTS btsdb;

SYSTEM CLS;

CREATE DATABASE btsdb;

USE btsdb;

CREATE TABLE states (
    state_id INT AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY(state_id)
);

INSERT INTO states (name) VALUES 
('Andaman and Nicobar Islands'),
('Andhra Pradesh'),
('Arunachal Pradesh'),
('Assam'),
('Bihar'),
('Chandigarh'),
('Chhattisgarh'),
('Dadra and Nagar Haveli and Daman and Diu'),
('Delhi'),
('Goa'),
('Gujarat'),
('Haryana'),
('Himachal Pradesh'),
('Jammu and Kashmir'),
('Jharkhand'),
('Karnataka'),
('Kerala'),
('Ladakh'),
('Lakshadweep'),
('Madhya Pradesh'),
('Maharashtra'),
('Manipur'),
('Meghalaya'),
('Mizoram'),
('Nagaland'),
('Odisha'),
('Puducherry'),
('Punjab'),
('Rajasthan'),
('Sikkim'),
('Tamil Nadu'),
('Telangana'),
('Tripura'),
('Uttar Pradesh'),
('Uttarakhand'),
('West Bengal');

CREATE TABLE cities (
    city_id INT AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    state_id INT NOT NULL,
    PRIMARY KEY(city_id),
    CONSTRAINT fk_city_state FOREIGN KEY (state_id) REFERENCES states(state_id)
);

INSERT INTO cities (name, state_id) VALUES
-- Andaman and Nicobar Islands (state_id: 1)
('Port Blair', 1), ('Diglipur', 1), ('Mayabunder', 1), ('Rangat', 1), ('Car Nicobar', 1),
('Malacca', 1), ('Mildera', 1), ('Kakana', 1), ('Manglutan', 1), ('Kanahinot', 1),

-- Andhra Pradesh (state_id: 2)
('Visakhapatnam', 2), ('Vijayawada', 2), ('Guntur', 2), ('Nellore', 2), ('Kurnool', 2),
('Kadapa', 2), ('Anantapur', 2), ('Tirupati', 2), ('Rajahmundry', 2), ('Kakinada', 2),
('Ongole', 2), ('Chittoor', 2), ('Proddatur', 2), ('Tenali', 2),
('Nandyala', 2), ('Guntakal', 2), ('Gudivada', 2), ('Adoni', 2),
('Nuzividu', 2), ('Mangalagiri', 2), ('Narsapur', 2), ('Dhone', 2), ('Punganur', 2),

-- Arunachal Pradesh (state_id: 3)
('East Siang', 3), ('Roing', 3), ('Ziro', 3), ('Bomdila', 3), ('Itanagar', 3), 
('Dirang H.Q.', 3), ('Jairampur', 3), ('Pangin', 3), ('Gandhigram', 3), ('Wakro', 3), 
('Nyapin', 3), ('Kharsang', 3), ('Khonsa', 3), ('Changlang', 3), ('Tawang', 3), 
('Aalo', 3), ('Pasighat', 3), ('Anini', 3), ('Yingkiong', 3), ('Boleng', 3), 
('Sagalee', 3), ('Taliha', 3), ('Bameng', 3), ('Gelling', 3), ('Tezu', 3), 
('Hawai', 3), ('Seppa', 3), ('Namsai', 3), ('Daporijo', 3), ('Naharlagun', 3), 
('Bordumsa', 3), ('Chowkham', 3), ('Deomali', 3), ('Dirang', 3), ('Lhou', 3), 
('Kalaktang', 3),

-- Assam (state_id: 4)
('Guwahati', 4), ('Jorhat', 4), ('Tezpur', 4), ('Dibrugarh', 4), ('Silchar', 4), 
('Nagaon', 4), ('North Lakhimpur', 4), ('Dhubri', 4), ('Karimganj', 4), ('Tinsukia', 4), 
('Diphu', 4), ('Sivasagar', 4), ('Bongaigaon', 4), ('Goalpara', 4), ('Kokrajhar', 4), 
('Dhekiajuli', 4), ('Hailakandi', 4), ('Golaghat', 4), ('Lanka', 4), 
('Bilasipara', 4), ('Chapar', 4), ('Lakhipur', 4), ('Haflong', 4),
('Nalbari', 4), ('Sonitpur', 4), ('Silapathar', 4), ('Barpeta Road', 4), ('Hojai', 4), 
('Mangaldoi', 4), ('Rangia', 4), ('Dergaon', 4), ('Barpeta', 4), ('Lumding', 4), 
('Sonari', 4), ('Tangla', 4),

-- Bihar (state_id: 5)
('Patna', 5), ('Bihar Sharif', 5), ('Bhagalpur', 5), ('Begusarai', 5), ('Munger', 5), 
('Chhapra', 5), ('Purnia', 5), ('Dehri', 5), ('Jamalpur', 5), ('Jehanabad', 5), 
('Forbesganj', 5), ('Revelganj', 5), ('Badalpura', 5), ('Masaurhi', 5), ('Madhubani', 5), 
('Bodh Gaya', 5), ('Muzaffarpur', 5), ('Buxar', 5), ('Darbhanga', 5), ('Bettiah', 5), 
('Katihar', 5), ('Saharsa', 5), ('Nalanda', 5), ('Nawada', 5), ('Habibpur', 5), 
('Banka', 5), ('Mehsi', 5), ('Dumra', 5), ('Dhaka', 5), ('Rafiganj', 5), 
('Siwan', 5), ('Arrah', 5), ('Motihari', 5), ('Sasaram', 5), ('Sitamarhi', 5), 
('Hajipur', 5), ('Samastipur', 5), ('Kishanganj', 5), ('Bagaha', 5), ('Nokha', 5), 
('Hilsa', 5), ('Supaul', 5), ('Rajgir', 5), ('Murliganj', 5),

-- Chandigarh (state_id: 6)
('Chandigarh', 6), ('Mohali', 6), ('Panchkula', 6), ('Zirakpur', 6), ('Kharar', 6),

-- Chhattisgarh (state_id: 7)
('Raipur', 7), ('Korba', 7), ('Bilaspur', 7), ('Raigarh', 7), ('Jagdalpur', 7), 
('Chirmiri', 7), ('Bhatgaon-1', 7), ('Bemetara', 7), ('Bhatapara', 7), ('Bade Bacheli', 7), 
('Dalli Rajhara', 7), ('Ambagarh Chowki', 7), ('Saraipali', 7), ('Mungeli', 7), 
('Jashpur Nagar', 7), ('Surajpur', 7), ('Akaltara', 7), ('Ambikapur', 7), ('Dhamtari', 7), 
('Takhatpur', 7), ('Kanker', 7), ('Durg', 7), ('Kawardha', 7), ('Baikunthpur', 7), 
('Khamhria', 7), ('Baloda Bazar', 7), ('Sakti', 7), ('Simga', 7), ('Khairagarh', 7), 
('Dongargarh', 7), ('Dongergaron', 7), ('Kharsia', 7), ('Rajnandgaon', 7), ('Bhilai', 7), 
('Gharghoda', 7), ('Naya Baradwar', 7), ('Mahasamund', 7), ('Kondagaon', 7), ('Arang', 7), 
('Sarangarh', 7), ('Gobra', 7), ('Gourella', 7), ('Champa', 7), ('Balod', 7), 
('Dantewada', 7), ('Sukma', 7), ('Kathgora', 7),

-- Dadra and Nagar Haveli and Daman and Diu (state_id: 8)
('Silvassa', 8), ('Daman', 8), ('Diu', 8), ('Naroli', 8), ('Amli', 8), 
('Dadra', 8), ('Gogola', 8), ('Dabhel', 8),

-- Delhi (state_id: 9)
('New Delhi', 9), ('Fatehpur Beri', 9), ('Mandoli', 9), ('Hasstsal Village', 9), 
('Dallupura', 9), ('Bakhtawar Pur Village', 9), ('Begum Pur', 9), ('Chhawla', 9), 
('Alipur', 9), ('Bawana', 9), ('Taj Pul', 9), ('Bhalswa Jahangir Pur', 9), 
('Sambhalka', 9), ('Karawal Nagar', 9), ('Burari', 9), ('Deoli', 9), ('Gokalpuri', 9), 
('Kirari Suleman Nagar', 9), ('Pooth Kalan', 9), ('Kair', 9), ('Nangloi', 9), 
('Karala Village', 9), ('Khera Kalan', 9), ('Nilothi', 9), ('Dayalpur', 9), 
('Jharoda Majra Burari', 9), ('Kanjhawala', 9), ('Kapas Hera', 9), ('Khazoori Khas', 9), 
('Kondli', 9), ('Siraspur', 9), ('Mundka', 9), ('Bankner', 9), ('Baprola', 9), 
('Ghitorni', 9), ('Johripur', 9), ('Mithapur', 9), ('Delhi Cantonment', 9), 
('Sultanpur', 9), ('Patparganj', 9), ('Roshanpura', 9), ('Khera Khurd Village', 9),

-- Goa (state_id: 10)
('Panaji', 10), ('Margao', 10), ('Vasco da Gama', 10), ('Mapusa', 10), ('Ponda', 10),
('Bicholim', 10), ('Valpoi', 10), ('Sanquelim', 10), ('Curchorem', 10), ('Sanguem', 10),

-- Gujarat (state_id: 11)
('Ahmedabad', 11), ('Surat', 11), ('Vadodara', 11), ('Rajkot', 11), ('Bhavnagar', 11),
('Jamnagar', 11), ('Gandhinagar', 11), ('Anand', 11), ('Bharuch', 11), ('Junagadh', 11),
('Gandhidham', 11), ('Navsari', 11), ('Veraval', 11), ('Porbandar', 11), ('Godhra', 11),
('Palanpur', 11), ('Himatnagar', 11), ('Surendranagar', 11), ('Valsad', 11), ('Bhuj', 11),

-- Haryana (state_id: 12)
('Gurgaon', 12), ('Faridabad', 12), ('Panipat', 12), ('Ambala', 12), ('Yamunanagar', 12),
('Rohtak', 12), ('Hisar', 12), ('Karnal', 12), ('Sonipat', 12), ('Panchkula', 12),
('Bhiwani', 12), ('Sirsa', 12), ('Bahadurgarh', 12), ('Jind', 12), ('Thanesar', 12),

-- Himachal Pradesh (state_id: 13)
('Shimla', 13), ('Mandi', 13), ('Solan', 13), ('Kullu', 13), ('Dharamshala', 13),
('Bilaspur', 13), ('Una', 13), ('Chamba', 13), ('Hamirpur', 13), ('Kangra', 13),
('Palampur', 13), ('Manali', 13), ('Kasauli', 13), ('Dalhousie', 13),

-- Jammu and Kashmir (state_id: 14)
('Srinagar', 14), ('Jammu', 14), ('Anantnag', 14), ('Baramulla', 14), ('Udhampur', 14),
('Kathua', 14), ('Rajouri', 14), ('Poonch', 14), ('Doda', 14), ('Kishtwar', 14),

-- Jharkhand (state_id: 15)
('Ranchi', 15), ('Jamshedpur', 15), ('Dhanbad', 15), ('Bokaro', 15), ('Deoghar', 15),
('Hazaribagh', 15), ('Giridih', 15), ('Dumka', 15), ('Phusro', 15), ('Adityapur', 15),
('Chatra', 15), ('Gumla', 15), ('Pakur', 15), ('Jhumri Tilaiya', 15), ('Saunda', 15),

-- Karnataka (state_id: 16)
('Bangalore', 16), ('Mysore', 16), ('Hubli', 16), ('Mangalore', 16), ('Belgaum', 16),
('Gulbarga', 16), ('Davangere', 16), ('Bellary', 16), ('Bijapur', 16), ('Shimoga', 16),
('Tumkur', 16), ('Raichur', 16), ('Bidar', 16), ('Hospet', 16), ('Gadag', 16),
('Chitradurga', 16), ('Kolar', 16), ('Mandya', 16), ('Udupi', 16), ('Hassan', 16),

-- Kerala (state_id: 17)
('Thiruvananthapuram', 17), ('Kochi', 17), ('Kozhikode', 17), ('Thrissur', 17), ('Kollam', 17),
('Alappuzha', 17), ('Palakkad', 17), ('Kannur', 17), ('Kottayam', 17), ('Pathanamthitta', 17),
('Malappuram', 17), ('Idukki', 17), ('Wayanad', 17), ('Kasaragod', 17), ('Ernakulam', 17),

-- Ladakh (state_id: 18)
('Leh', 18), ('Kargil', 18),

-- Lakshadweep (state_id: 19)
('Kavaratti', 19), ('Agatti', 19), ('Amini', 19), ('Andrott', 19), ('Kadmat', 19),

-- Madhya Pradesh (state_id: 20)
('Bhopal', 20), ('Indore', 20), ('Jabalpur', 20), ('Gwalior', 20), ('Ujjain', 20),
('Sagar', 20), ('Dewas', 20), ('Satna', 20), ('Ratlam', 20), ('Rewa', 20),
('Vidisha', 20), ('Katni', 20), ('Khandwa', 20), ('Morena', 20), ('Chhindwara', 20),
('Neemuch', 20), ('Shivpuri', 20), ('Burhanpur', 20), ('Mandsaur', 20), ('Narmadapuram', 20),
('Sehore', 20), ('Guna', 20), ('Betul', 20), ('Itarsi', 20), ('Singrauli', 20),
('Damoh', 20), ('Seoni', 20), ('Pithampur', 20), ('Maihar', 20), ('Bhind', 20),
('Chhatarpur', 20), ('Nagda', 20), ('Khargone', 20), ('Badnawar', 20), ('Khachrod', 20),
('Kasrawad', 20), ('Barwaha', 20), ('Manawar', 20), ('Mauganj', 20), ('Sarangarpur', 20),
('Multai', 20), ('Mungaoli', 20), ('Berasia', 20), ('Bhander', 20), ('Bhanpura', 20),
('Ambah', 20), ('Rehli', 20), ('Rajpur', 20),

-- Maharashtra (state_id: 21)
('Mumbai', 21), ('Pune', 21), ('Nagpur', 21), ('Thane', 21), ('Nashik', 21),
('Chhatrapati Sambhajinagar', 21), ('Solapur', 21), ('Kolhapur', 21), ('Amravati', 21), ('Navi Mumbai', 21),
('Sangli', 21), ('Jalgaon', 21), ('Akola', 21), ('Latur', 21), ('Ahmednagar', 21),
('Chandrapur', 21), ('Parbhani', 21), ('Ichalkaranji', 21), ('Jalna', 21), ('Dhule', 21),
('Malegaon', 21), ('Nanded', 21), ('Bhiwandi', 21), ('Vasai-Virar', 21), ('Mira Bhayandar', 21),
('Ulhasnagar', 21), ('Badlapur', 21), ('Kalyan', 21), ('Ambernath', 21), ('Panvel', 21),
('Beed', 21), ('Wardha', 21), ('Satara', 21), ('Ratnagiri', 21), ('Barshi', 21),
('Yavatmal', 21), ('Gondia', 21), ('Dharashiv (Osmanabad)', 21), ('Hinganghat', 21), ('Bhusawal', 21),
('Udgir', 21), ('Nandurbar', 21), ('Achalpur', 21), ('Junnar', 21), ('Khed', 21),

-- Manipur (state_id: 22)
('Imphal', 22), ('Thoubal', 22), ('Bishnupur', 22), ('Churachandpur', 22), ('Ukhrul', 22),
('Senapati', 22), ('Tamenglong', 22), ('Chandel', 22), ('Jiribam', 22), ('Kakching', 22),

-- Meghalaya (state_id: 23)
('Shillong', 23), ('Tura', 23), ('Jowai', 23), ('Nongstoin', 23), ('Williamnagar', 23),
('Nongpoh', 23), ('Baghmara', 23), ('Resubelpara', 23), ('Mairang', 23), ('Ampati', 23),

-- Mizoram (state_id: 24)
('Aizawl', 24), ('Lunglei', 24), ('Saiha', 24), ('Champhai', 24), ('Kolasib', 24),
('Serchhip', 24), ('Lawngtlai', 24), ('Mamit', 24), ('Saitual', 24), ('Khawzawl', 24),

-- Nagaland (state_id: 25)
('Kohima', 25), ('Dimapur', 25), ('Mokokchung', 25), ('Tuensang', 25), ('Wokha', 25),
('Zunheboto', 25), ('Phek', 25), ('Mon', 25), ('Kiphire', 25), ('Longleng', 25),

-- Odisha (state_id: 26)
('Bhubaneswar', 26), ('Cuttack', 26), ('Rourkela', 26), ('Brahmapur', 26), ('Sambalpur', 26),
('Puri', 26), ('Baleshwar', 26), ('Baripada', 26), ('Bhadrak', 26), ('Balangir', 26),
('Jharsuguda', 26), ('Jajpur', 26), ('Kendujhar', 26), ('Mayurbhanj', 26), ('Koraput', 26),

-- Puducherry (state_id: 27)
('Puducherry', 27), ('Karaikal', 27), ('Mahe', 27), ('Yanam', 27),

-- Punjab (state_id: 28)
('Patiala', 28), ('Amritsar', 28), ('Jalandhar', 28), ('Ludhiana', 28), ('Bathinda', 28),
('Sahibzada Ajit Singh Nagar', 28), ('Pathankot', 28), ('Barnala', 28), ('Khanna', 28), ('Abohar', 28),
('Fazilka', 28), ('Hoshiarpur', 28), ('Shaheed Bhagat Singh Nagar', 28), ('Dhuri', 28), ('Phagwara', 28),
('Ajnala', 28), ('Phillaur', 28), ('Bassi Pathana', 28), ('Talwandi Sabo', 28), ('Sri Muktsar Sahib', 28),
('Kapurthala', 28), ('Faridkot', 28), ('Rupnagar', 28), ('Tarn Taran Sahib', 28), ('Mansa', 28),
('Mukerian', 28), ('Patran', 28), ('Sirhind', 28), ('Samana', 28), ('Gidderbaha', 28),
('Kot Kapura', 28), ('Sanaur', 28), ('Jalalabad', 28), ('Zira', 28),
('Talwara', 28), ('Maur', 28), ('Patti', 28), ('Gurdaspur', 28), ('Malerkotla', 28),
('Batala', 28), ('Anandpur Sahib', 28), ('Nawanshahr', 28), ('Rajpura', 28), ('Sangrur', 28),
('Moga', 28), ('Firozpur', 28),

-- Rajasthan (state_id: 29)
('Jaipur', 29), ('Jodhpur', 29), ('Kota', 29), ('Bikaner', 29), ('Ajmer', 29),
('Udaipur', 29), ('Bhilwara', 29), ('Alwar', 29), ('Sri Ganganagar', 29), ('Sikar', 29),
('Pali', 29), ('Tonk', 29), ('Sawai Madhopur', 29), ('Baran', 29), ('Dholpur', 29),
('Karauli', 29), ('Bundi', 29), ('Chittorgarh', 29), ('Rajsamand', 29), ('Dungarpur', 29),

-- Sikkim (state_id: 30)
('Gangtok', 30), ('Namchi', 30), ('Mangan', 30), ('Gyalshing', 30),

-- Tamil Nadu (state_id: 31)
('Chennai', 31), ('Coimbatore', 31), ('Madurai', 31), ('Salem', 31), ('Tiruchirappalli', 31),
('Vellore', 31), ('Erode', 31), ('Tiruppur', 31), ('Thoothukkudi', 31), ('Dindigul', 31),
('Thanjavur', 31), ('Ranipet', 31), ('Sivakasi', 31), ('Karur', 31), ('Udhagamandalam', 31),
('Hosur', 31), ('Nagercoil', 31), ('Kanchipuram', 31), ('Kumarapalayam', 31), ('Cuddalore', 31),

-- Telangana (state_id: 32)
('Hyderabad', 32), ('Warangal', 32), ('Nizamabad', 32), ('Karimnagar', 32), ('Ramagundam', 32),
('Khammam', 32), ('Mahbubnagar', 32), ('Nalgonda', 32), ('Adilabad', 32), ('Siddipet', 32),
('Suryapet', 32), ('Miryalaguda', 32), ('Jagtial', 32), ('Jangaon', 32), ('Bodhan', 32),

-- Tripura (state_id: 33)
('Agartala', 33), ('Udaipur', 33), ('Dharmanagar', 33), ('Kailasahar', 33), ('Belonia', 33),
('Khowai', 33), ('Teliamura', 33), ('Ambassa', 33), ('Sabroom', 33), ('Kamalpur', 33),

-- Uttar Pradesh (state_id: 34)
('Lucknow', 34), ('Agra', 34), ('Prayagraj', 34), ('Varanasi', 34), ('Kanpur', 34),
('Ghaziabad', 34), ('Moradabad', 34), ('Firozabad', 34), ('Aligarh', 34), ('Shahjahanpur', 34),
('Noida', 34), ('Rampur', 34), ('Muzaffarnagar', 34), ('Raebareli', 34), ('Deoria', 34),
('Fatehpur', 34), ('Orai', 34), ('Banda', 34), ('Mau', 34), ('Ghazipur', 34),
('Ballia', 34), ('Amroha', 34), ('Hapur', 34), ('Bareilly', 34), ('Budaun', 34),
('Akbarpur', 34), ('Etawah', 34), ('Etah', 34), ('Sambhal', 34), ('Sitapur', 34),
('Kasganj', 34), ('Bahraich', 34), ('Mathura', 34), ('Unnao', 34), ('Gorakhpur', 34),
('Jaunpur', 34), ('Shamli', 34), ('Mainpuri', 34), ('Gonda', 34), ('Hathras', 34),
('Pilibhit', 34), ('Meerut', 34), ('Jhansi', 34), ('Lakhimpur', 34),

-- Uttarakhand (state_id: 35)
('Rishikesh', 35), ('Dehradun', 35), ('Haridwar', 35), ('Nainital', 35), ('Haldwani', 35),
('Mussoorie', 35), ('Roorkee', 35), ('Kashipur', 35), ('Rudrapur', 35), ('Almora', 35),
('Pithoragarh', 35), ('Ranikhet', 35), ('Jaspur', 35), ('Narendra Nagar', 35), ('New Tehri', 35),
('Didihat', 35), ('Dharchula', 35), ('Lansdowne', 35), ('Khatima', 35), ('Gopeshwar', 35),
('Dugadda', 35), ('Karnaprayag', 35), ('Barkot', 35), ('Doiwala', 35), ('Rudraprayag', 35),
('Champawat', 35), ('Chakrata', 35), ('Lohaghat', 35), ('Kichha', 35), ('Bageshwar', 35),
('Badrinath', 35), ('Bazpur', 35), ('Kirtinagar', 35), ('Devprayag', 35), ('Joshimath', 35),
('Ramnagar', 35), ('Manglaur', 35), ('Vikasnagar', 35), ('Pauri', 35), ('Kaladhungi', 35),
('Kotdwar', 35), ('Gangotri', 35), ('Ramnagar Kashipur', 35), ('Bhimtal', 35), ('Sitarganj', 35),
('Herbertpur', 35), ('Mohampur Mohammadpur', 35),

-- West Bengal (state_id: 36)
('Kolkata', 36), ('Howrah', 36), ('Durgapur', 36), ('Asansol', 36), ('Siliguri', 36),
('Bardhaman', 36), ('Malda', 36), ('Baharampur', 36), ('Habra', 36), ('Kharagpur', 36),
('Shantipur', 36), ('Dankuni', 36), ('Dhulian', 36), ('Ranaghat', 36), ('Haldia', 36),
('Krishnanagar', 36), ('Bankura', 36), ('Jalpaiguri', 36);

CREATE TABLE status (
    status_id INT AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    PRIMARY KEY (status_id)
);

INSERT INTO status(name) VALUES 
('Verified'), ('Unverified'), ('Blocked'), ('Active'), ('Inactive'), 
('Cancelled'), ('Confirmed'), ('Waiting'), ('Under Maintenance');

CREATE TABLE user_types (
    user_type_id INT AUTO_INCREMENT,
    name VARCHAR(15) NOT NULL,
    PRIMARY KEY (user_type_id)
);

INSERT INTO user_types(name) VALUES
('Passenger'), ('Operator'), ('Driver');


CREATE TABLE users (
    user_id INT AUTO_INCREMENT,
    full_name VARCHAR(75) NOT NULL,
    contact VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    verification_code VARCHAR(100) DEFAULT NULL,
    dob DATE NOT NULL,
    gender INT NOT NULL CHECK (gender IN (1, 2, 3)),
    profile_pic VARCHAR(255),
    status_id INT NOT NULL,
    user_type_id INT NOT NULL,
    PRIMARY KEY (user_id),
    CONSTRAINT fk_user_status FOREIGN KEY (status_id) REFERENCES status(status_id),
    CONSTRAINT fk_user_type FOREIGN KEY (user_type_id) REFERENCES user_types(user_type_id)
);

CREATE TABLE operators (
    operator_id INT AUTO_INCREMENT,
    full_name VARCHAR(75) NOT NULL,
    contact VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    registration_date DATE NOT NULL,
    verification_code VARCHAR(100) DEFAULT NULL,
    address VARCHAR(500) NOT NULL,
    certificate VARCHAR(100),
    website VARCHAR(100) UNIQUE,
    logo VARCHAR(100),
    banner VARCHAR(100),
    base_charge INT NOT NULL,
    status_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY(operator_id),
    CONSTRAINT fk_operator_status FOREIGN KEY (status_id) REFERENCES status(status_id),
    CONSTRAINT fk_operator_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE buses (
    bus_id INT AUTO_INCREMENT,
    bus_number VARCHAR(10) NOT NULL UNIQUE,
    seats INT NOT NULL,
    manufacturer VARCHAR(50) NOT NULL,
    seating_type VARCHAR(10) NOT NULL,
    operator_id INT NOT NULL,
    PRIMARY KEY (bus_id),
    CONSTRAINT fk_buses_operators FOREIGN KEY (operator_id) REFERENCES operators(operator_id)
);

CREATE TABLE routes (
    route_id INT AUTO_INCREMENT,
    destination INT NOT NULL,
    distance INT NOT NULL,
    duration INT NOT NULL,
    source INT NOT NULL,
    PRIMARY KEY (route_id),
    CONSTRAINT fk_source_cities FOREIGN KEY(source) REFERENCES cities(city_id),
    CONSTRAINT fk_destination_cities FOREIGN KEY(destination) REFERENCES cities(city_id)
);

CREATE TABLE route_midcities (
    route_midcity_id INT AUTO_INCREMENT,
    route_id INT NOT NULL,
    midcity_id INT NOT NULL,
    distance_from_source INT NOT NULL,
    duration_from_source INT NOT NULL,
    PRIMARY KEY (route_midcity_id),
    CONSTRAINT fk_route_midcities_routes FOREIGN KEY(route_id) REFERENCES routes(route_id),
    CONSTRAINT fk_route_midcities_city FOREIGN KEY(midcity_id) REFERENCES cities(city_id)
);

CREATE TABLE operator_routes (
    operator_route_id INT AUTO_INCREMENT,
    operator_id INT NOT NULL,
    route_id INT NOT NULL,
    PRIMARY KEY (operator_route_id),
    CONSTRAINT fk_operator_routes_operators FOREIGN KEY(operator_id) REFERENCES operators(operator_id),
    CONSTRAINT fk_operator_routes_route FOREIGN KEY(route_id) REFERENCES routes(route_id)
);

CREATE TABLE operator_route_midcities (
    operator_route_midcity_id INT AUTO_INCREMENT,
    halting_time INT NOT NULL,
    operator_route_id INT NOT NULL,
    route_midcity_id INT NOT NULL,
    PRIMARY KEY (operator_route_midcity_id),
    CONSTRAINT fk_operator_route_midcities_operator_routes FOREIGN KEY (operator_route_id) REFERENCES operator_routes(operator_route_id),
    CONSTRAINT fk_operator_route_midcities_route_midcities FOREIGN KEY (route_midcity_id) REFERENCES route_midcities(route_midcity_id)
);

CREATE TABLE weekdays (
    weekday_id INT AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL UNIQUE,
    PRIMARY KEY (weekday_id)
);

INSERT INTO weekdays(name) VALUES 
('Monday'), ('Tuesday'), ('Wednesday'), ('Thursday'), ('Friday'), ('Saturday'), ('Sunday');

CREATE TABLE bus_route_weekdays (
    bus_route_weekday_id INT AUTO_INCREMENT,
    weekday_id INT NOT NULL,
    operator_route_id INT NOT NULL,
    PRIMARY KEY(bus_route_weekday_id),
    CONSTRAINT fk_brw_weekdays FOREIGN KEY (weekday_id) REFERENCES weekdays(weekday_id),
    CONSTRAINT fk_brw_operator_routes FOREIGN KEY(operator_route_id) REFERENCES operator_routes(operator_route_id)
);

CREATE TABLE fare_factor (
    fare_factor_id INT AUTO_INCREMENT,
    factor VARCHAR(30) NOT NULL UNIQUE,
    fixed_charge BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (fare_factor_id)
);

CREATE TABLE operator_ticket_fare (
    operator_ticket_fare_id INT AUTO_INCREMENT,
    charges INT NOT NULL,
    operator_id INT NOT NULL,
    fare_factor_id INT NOT NULL,
    PRIMARY KEY (operator_ticket_fare_id),
    CONSTRAINT fk_otf_operators FOREIGN KEY(operator_id) REFERENCES operators(operator_id),
    CONSTRAINT fk_otf_fare_factor FOREIGN KEY(fare_factor_id) REFERENCES fare_factor(fare_factor_id)
);

CREATE TABLE bus_fare_factor (
    bus_fare_factor_id INT AUTO_INCREMENT,
    price INT NOT NULL,
    bus_id INT NOT NULL,
    fare_factor_id INT NOT NULL,
    PRIMARY KEY (bus_fare_factor_id),
    CONSTRAINT fk_bff_buses FOREIGN KEY(bus_id) REFERENCES buses(bus_id),
    CONSTRAINT fk_bff_fare_factor FOREIGN KEY(fare_factor_id) REFERENCES fare_factor(fare_factor_id)
);

CREATE TABLE drivers (
    driver_id INT AUTO_INCREMENT,
    start_date DATE NOT NULL,
    end_date DATE,
    user_id INT NOT NULL,
    operator_id INT NOT NULL,
    licence_pic VARCHAR(50),
    licence_no VARCHAR(50),
    PRIMARY KEY(driver_id),
    CONSTRAINT fk_driv_users FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT fk_driv_operators FOREIGN KEY(operator_id) REFERENCES operators(operator_id)
);

CREATE TABLE schedules (
    schedule_id INT AUTO_INCREMENT,
    journey_date DATE NOT NULL,
    additional_charges INT NOT NULL DEFAULT 0,
    seater_seats_booked INT NOT NULL DEFAULT 0,
    sleeper_seats_booked INT NOT NULL DEFAULT 0,
    sleeper_fare INT NOT NULL DEFAULT 0,
    seater_fare INT NOT NULL DEFAULT 0,
    bus_id INT NOT NULL,
    driver_id INT NOT NULL,
    bus_route_weekday_id INT NOT NULL,
    PRIMARY KEY(schedule_id),
    CONSTRAINT fk_schl_buses FOREIGN KEY(bus_id) REFERENCES buses(bus_id),
    CONSTRAINT fk_schl_drivers FOREIGN KEY(driver_id) REFERENCES drivers(driver_id),
    CONSTRAINT fk_schl_bus_route_weekdays FOREIGN KEY(bus_route_weekday_id) REFERENCES bus_route_weekdays(bus_route_weekday_id)
);

CREATE TABLE bookings (
    booking_id INT AUTO_INCREMENT,
    booked_seats INT NOT NULL,
    total_fare INT NOT NULL,
    transaction_pic VARCHAR(255) NOT NULL,
    booking_date DATETIME NOT NULL,
    user_id INT NOT NULL,
    schedule_id INT NOT NULL,
    PRIMARY KEY(booking_id),
    CONSTRAINT fk_booking_users FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT fk_booking_schedules FOREIGN KEY(schedule_id) REFERENCES schedules(schedule_id)
);

CREATE TABLE bus_images (
    bus_image_id INT AUTO_INCREMENT,
    pic VARCHAR(255) NOT NULL,
    bus_id INT NOT NULL,
    PRIMARY KEY(bus_image_id),
    CONSTRAINT fk_bimg_buses FOREIGN KEY(bus_id) REFERENCES buses(bus_id)
);

CREATE TABLE seatings (
    seating_id INT AUTO_INCREMENT,
    ls_count INT NOT NULL,
    rs_count INT NOT NULL,
    row_count INT NOT NULL,
    deck BOOLEAN NOT NULL,
    sleeper BOOLEAN NOT NULL DEFAULT FALSE,
    bus_id INT NOT NULL,
    PRIMARY KEY(seating_id),
    CONSTRAINT fk_seating_buses FOREIGN KEY(bus_id) REFERENCES buses(bus_id)
);

CREATE TABLE tickets (
    ticket_id INT AUTO_INCREMENT,
    seat_no VARCHAR(3) NOT NULL,
    booking_id INT NOT NULL,
    status_id INT NOT NULL,
    PRIMARY KEY(ticket_id),
    CONSTRAINT fk_tkt_bookings FOREIGN KEY(booking_id) REFERENCES bookings(booking_id),
    CONSTRAINT fk_tkt_status FOREIGN KEY(status_id) REFERENCES status(status_id)
);

SELECT
rm.route_midcity_id, rm.distance_from_source, rm.duration_from_source,
r.route_id, r.distance, r.duration,
s.city_id AS 'source_city_id', s.name AS 'source_city_name',
ss.state_id AS 'source_state_id', ss.name AS 'source_state_name',
d.city_id AS 'destination_city_id', d.name AS 'destination_city_name',
ds.state_id AS 'destination_state_id', ds.name AS 'destination_state_name',
mc.city_id AS 'mid_city_id', mc.name AS 'mid_city_name',
ms.state_id AS 'mid_state_id', ms.name AS 'mid_state_name'
FROM route_midcities rm
JOIN routes r ON rm.route_id = r.route_id
JOIN cities mc ON rm.midcity_id = mc.city_id
JOIN states ms ON mc.state_id = ms.state_id
JOIN cities s on r.source = s.city_id
JOIN states ss on s.state_id = ss.state_id
JOIN cities d on r.destination = d.city_id
JOIN states ds on d.state_id = ds.state_id;