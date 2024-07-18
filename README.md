# Alerglow
An application for detecting skin allergies solves the problem of difficulties in identifying skin allergy symptoms using the CNN algorithm

![Skin Allergy Example](https://drive.google.com/uc?export=view&id=1acBt29cuTyBjBh3Zg7EVaRRBew3_LEgq)

<p align="justify">
The skin allergy detection application aims to solve the problem of difficulty in identifying skin allergy symptoms using a Convolutional Neural Network (CNN) algorithm. The application is built with JavaScript for the frontend and Python for the backend. Users can upload photos of their skin, which are then analyzed by the CNN model to detect signs of skin allergies. The analysis results are returned to the frontend and presented through a responsive and user-friendly interface. Based on the detection, the application provides initial care suggestions or recommends consulting a dermatologist, helping users take prompt and appropriate actions.
</p>

### Our Team
|No |  Name                   | Role                     | Class               | NIM        |
|:-:|:-----------------------:|:------------------------:|:-------------------:|:----------:|
| 1 | Aditya Muhamad Maulana  | Backend / ML Engineer    |Praktikum D, Teori D | 1207050002 |
| 2 | Arham Syuhada           | Backend Developer        |Praktikum D, Teori D | 1207050017 |
| 3 | Rifky Zaini Faroj       | Researcher / ML Engineer |Praktikum E, Teori D | 1217050122 |
| 4 | Rifqi Syekhi Marsaputra | Frontend / ML Engineer   |Praktikum F, Teori D | 1217050123 |

### Methodology

| Stage                    | Description                                                                                                                                                             |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Data Collection**      | Data sourced from Kaggle, categorized into allergic and non-allergic symptoms, and augmented for diversity and prevention of overfitting.                               |
| **Data Preprocessing**   | Images validated, duplicates removed, resized to 224x224 pixels, and normalized. Data augmentation applied for increased variability.                                   |
| **Model Architecture**   | CNN employed with convolutional layers for feature extraction, pooling layers for dimensionality reduction, and fully connected layers for classification.              |
| **Model Training**       | Trained over 15 epochs using Adam optimizer, batch size of 64, with input data of 56x56 pixels. Data augmentation and early stopping used for performance enhancement.  |
| **Model Testing**        | Evaluated on separate test set, metrics calculated include accuracy, precision, recall, and F1-score. Confusion matrices generated for performance visualization.       |


|                  |                                                                                                               |
|------------------|:-------------------------------------------------------------------------------------------------------------:|
| Demo Aplication  |  [Click Here](https://youtu.be/-ffuwiatO_o?si=0lA_rzTBd6k0KKor)                                               |
| Promotion Video  |  [Clik Here](https://www.instagram.com/reel/C63kT-_RZOf/?igsh=MWZ3ZG84Y3VxZDIxZA==)                           |
| Proposal         |  [Click Here](https://drive.google.com/file/d/1iSiqosv2qs0_2WerfvpWrBDEqL3lNW21/view?usp=drive_link)          |
| Paper            |  [CLick Here](https://drive.google.com/file/d/18SJZ9Oz5KBMRLdqVjSWwEZaGJJ7DiMwf/view?usp=drive_link)          |
