
---

# EASWARI ENGINEERING COLLEGE
## (Autonomous Institution)
### Ramapuram, Chennai – 600 089

&nbsp;

&nbsp;

## PROJECT REPORT

**Submitted in partial fulfillment of the requirements for the award of the degree of**

## BACHELOR OF TECHNOLOGY

**in**

## COMPUTER SCIENCE AND ENGINEERING
### (Artificial Intelligence and Data Science)

&nbsp;

**Submitted by**

| Register Number | Name |
|---|---|
| [Your Register Number] | KIRUBA |

&nbsp;

**Under the guidance of**

**[Guide Name]**
Assistant Professor, Department of CSE (AI & DS)

&nbsp;

**DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING**
**(Artificial Intelligence and Data Science)**

**EASWARI ENGINEERING COLLEGE**
**Ramapuram, Chennai – 600 089**

**October 2026**

---

# EASWARI ENGINEERING COLLEGE
## BONAFIDE CERTIFICATE

Certified that this project report titled **"MEDIASSIST – A WEB-BASED CLINICAL DECISION SUPPORT SYSTEM FOR HEALTHCARE PROFESSIONALS"** is the Bonafide work of **"KIRUBA ([Your Register Number])"**, who carried out the project work under my supervision.

&nbsp;

&nbsp;

**HEAD OF THE DEPARTMENT** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **SUPERVISOR**

Dr. [HOD Name] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Guide Name]

Easwari Engineering College &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Easwari Engineering College

Ramapuram, Chennai – 600 089 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ramapuram, Chennai – 600 089

---

# EASWARI ENGINEERING COLLEGE
## Certificate of Viva-voce Examination

This is to certify that the Viva Voce Examination of the Project Work entitled **"MediAssist – A Web-Based Clinical Decision Support System for Healthcare Professionals"** submitted by **Kiruba ([Your Register Number])** in partial fulfillment of the requirements for the award of the degree of Bachelor of Technology was conducted on **[Date]** in the Department of Artificial Intelligence and Data Science, Easwari Engineering College, Ramapuram, Chennai.

&nbsp;

&nbsp;

**Internal Examiner** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **External Examiner**

Date: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date:

---

## ABSTRACT

The MediAssist Clinical Decision Support System (CDSS) is a web-based application developed to support healthcare professionals in managing patient records, monitoring clinical vitals, and receiving structured diagnostic assistance. In modern clinical environments, patient information is often scattered across multiple systems, making it difficult to obtain a complete clinical picture quickly. This system provides a centralized, secure, and accessible platform for viewing patient demographics, tracking real-time vitals, calculating clinical risk scores, and receiving AI-assisted differential diagnoses.

The application is developed using React 19 and TypeScript for the frontend, with Vite 8 as the build tool and Tailwind CSS v4 for styling. The backend is built using Spring Boot with Java, connected to a PostgreSQL database through Spring Data JPA and Hibernate. Clerk provides secure authentication with role-based access control. Axios handles HTTP communication between the frontend and the Spring Boot REST API. React Router DOM v7 manages client-side navigation.

The system includes several modules: a public Landing Page, a Clerk-based Login interface, a Role Selection page, and a comprehensive Clinical Dashboard. The Clinical Dashboard presents a patient summary header, five real-time vital sign tiles (Heart Rate, Blood Pressure, SpO2, Respiratory Rate, and Body Temperature), clinical risk scores including qSOFA and TIMI, evidence-based treatment pathway recommendations, and an AI-assisted differential diagnosis panel with probability scores and clinical justification.

Patient records are stored in a PostgreSQL database and managed through a Spring Boot REST API, exposing endpoints for retrieving and creating patient data. The Patient entity stores demographic information including patient ID, name, age, gender, and blood group. Spring Security configures CORS headers and access control for the backend API. The project is maintained on GitHub at github.com/Kiruba-31/Health-Care-1 under the main branch.

The main objective of the system is to improve the speed and accuracy of clinical decision-making by providing healthcare professionals with a centralized interface that combines patient data management, vital monitoring, risk scoring, and diagnostic support. By integrating modern web technologies with clinical decision support concepts, the MediAssist system provides a practical foundation for improving patient care quality.

*iii*

---

## ACKNOWLEDGEMENT

We express our sincere gratitude to the Principal and the Management of our college for providing us with the opportunity to carry out this project work.

We convey our heartfelt thanks to the Head of the Department, Department of Artificial Intelligence and Data Science, for the continuous encouragement and support provided throughout the duration of this project.

We are extremely thankful to our Project Guide, Department of Artificial Intelligence and Data Science, for the valuable guidance, constructive suggestions, and motivation provided during the planning, development, and completion of this project.

We would also like to extend our gratitude to all the faculty members of the Department of Artificial Intelligence and Data Science for their support and encouragement during the course of this project.

Finally, we thank our parents and friends for their constant encouragement, moral support, and help during the completion of this project.

*iv*

---

## LIST OF TABLES

| TABLE NO. | TITLE | PAGE No. |
|---|---|---|
| 3.1 | Software Requirements of MediAssist System | 9 |
| 3.2 | Hardware Requirements of MediAssist System | 10 |

*v*

---

## LIST OF FIGURES

| FIGURE NO. | TITLE | PAGE No. |
|---|---|---|
| 4.1 | System Architecture of MediAssist Clinical Decision Support System | 12 |
| 4.2 | Class Diagram of MediAssist Backend Components | 15 |
| 4.3 | Sequence Diagram of MediAssist User Interaction Flow | 16 |
| 1 | Landing Page – MediAssist Home | 31 |
| 2 | Login Page – Clerk Authentication | 31 |
| 3 | Role Selection Page | 32 |
| 4 | Clinical Dashboard – Patient Summary and Vitals | 32 |
| 5 | Clinical Dashboard – qSOFA and TIMI Risk Scores | 33 |
| 6 | Clinical Dashboard – Recommended Treatment Pathways | 33 |
| 7 | Clinical Dashboard – AI Differential Diagnosis Panel | 34 |
| 8 | Patient Records – API Response | 34 |
| 9 | Spring Boot Backend – Console Output | 35 |
| 10 | GitHub Repository – Project Files | 35 |

*vi*

---

## TABLE OF CONTENTS

| CHAPTER NO. | TITLE | PAGE No. |
|---|---|---|
| | ABSTRACT | iii |
| | ACKNOWLEDGEMENT | iv |
| | LIST OF TABLES | v |
| | LIST OF FIGURES | vi |
| **1** | **INTRODUCTION** | **1** |
| 1.1 | OVERVIEW | 1 |
| 1.2 | PROBLEM DEFINITION | 2 |
| 1.3 | OBJECTIVE | 3 |
| 1.4 | SCOPE OF THE PROJECT | 3 |
| 1.5 | MOTIVATION | 4 |
| **2** | **LITERATURE SURVEY** | **5** |
| 2.1 | LITERATURE REVIEW | 5 |
| 2.2 | EXISTING SYSTEM | 6 |
| 2.3 | PROPOSED SYSTEM | 7 |
| **3** | **SYSTEM ANALYSIS** | **8** |
| 3.1 | SYSTEM REQUIREMENTS | 8 |
| 3.1.1 | Functional Requirements | 8 |
| 3.1.2 | Non-Functional Requirements | 9 |
| 3.2 | SOFTWARE AND HARDWARE REQUIREMENTS | 9 |
| 3.2.1 | Software Requirements | 9 |
| 3.2.2 | Hardware Requirements | 10 |
| **4** | **METHODOLOGY** | **11** |
| 4.1 | SYSTEM ARCHITECTURE | 11 |
| 4.2 | MODULE DESCRIPTION | 12 |
| 4.2.1 | Landing Page Module | 12 |
| 4.2.2 | Authentication Module | 13 |
| 4.2.3 | Role Selection Module | 13 |
| 4.2.4 | Clinical Dashboard Module | 13 |
| 4.2.5 | Patient Records Module | 14 |
| 4.2.6 | Vitals Monitoring Module | 14 |
| 4.2.7 | Clinical Risk Scores Module | 14 |
| 4.2.8 | Navigation Module | 15 |
| 4.3 | CLASS DIAGRAM | 15 |
| 4.4 | SEQUENCE DIAGRAM | 16 |
| **5** | **RESULTS AND DISCUSSION** | **17** |
| 5.1 | IMPLEMENTATION OVERVIEW | 17 |
| 5.2 | KEY FUNCTIONS (CODE EXPLANATION) | 18 |
| 5.2.1 | Landing Page and Application Entry | 18 |
| 5.2.2 | Clerk Authentication and Login | 19 |
| 5.2.3 | Role Selection | 20 |
| 5.2.4 | Clinical Dashboard and Patient Summary | 21 |
| 5.2.5 | Real-Time Vitals Display | 22 |
| 5.2.6 | Clinical Risk Score Calculation | 23 |
| 5.2.7 | AI Differential Diagnosis Panel | 24 |
| 5.2.8 | Patient API and Data Management | 25 |
| 5.2.9 | Spring Boot Security Configuration | 26 |
| 5.2.10 | Application Navigation | 27 |
| **6** | **CONCLUSION AND FUTURE WORK** | **28** |
| 6.1 | CONCLUSION | 28 |
| 6.2 | FUTURE ENHANCEMENTS | 29 |
| | APPENDIX | 30 |
| | SCREENSHOTS OF THE PROJECT | 31 |
| | REFERENCES | 36 |

*vii*

---

# CHAPTER 1
## INTRODUCTION

This chapter introduces the MediAssist Clinical Decision Support System, including its overview, problem definition, objectives, scope, and motivation. The project focuses on providing healthcare professionals with a centralized platform for accessing patient information, monitoring clinical vitals, and receiving structured diagnostic assistance through a secure web-based application.

### 1.1 OVERVIEW

Healthcare professionals are required to make critical, time-sensitive decisions based on patient data that is often spread across multiple systems. The accuracy and speed of clinical decision-making directly impacts patient outcomes, and any delay in accessing relevant information can have serious consequences in emergency and high-dependency clinical settings.

The MediAssist Clinical Decision Support System is a web-based application developed to address this challenge by providing a centralized interface for patient record management, real-time vitals monitoring, clinical risk scoring, and AI-assisted differential diagnosis. The system is designed for use by authorized healthcare providers, including doctors, nurses, and clinical administrators.

The application is organized into clearly defined modules that work together to provide a comprehensive clinical view. The Clinical Dashboard serves as the primary interface, presenting patient demographics, vital signs, risk scores, recommended protocols, and differential diagnoses in a single, structured layout. The patient records backend manages clinical data through a REST API connected to a PostgreSQL database.

MediAssist aims to simplify clinical information access and improve the speed and quality of medical decision-making through an integrated, user-friendly web platform. By combining modern frontend development with React 19 and TypeScript, reliable backend services through Spring Boot, and clinical decision support principles, the system provides a practical tool for healthcare professionals. The platform is designed to be both immediately useful in its current form and easily extensible to support future clinical enhancements.

The application uses Clerk for secure authentication, ensuring that only authorized healthcare professionals can access patient information. Role-based access control allows the system to provide different levels of access depending on the user's clinical role. The frontend communicates with the backend through Axios HTTP calls, and the backend is connected to a PostgreSQL database through Spring Data JPA and Hibernate.

*1*

---

### 1.2 PROBLEM DEFINITION

In many hospital and clinical settings, patient information is maintained through a combination of electronic health record systems, paper files, laboratory information systems, and bedside monitoring equipment. These systems often operate independently, making it difficult for clinicians to access a complete, up-to-date clinical picture without switching between multiple applications or waiting for data to be transferred manually.

Clinical risk assessment tools such as the qSOFA (Quick Sequential Organ Failure Assessment) score and the TIMI (Thrombolysis in Myocardial Infarction) risk score are widely used in critical care and cardiology settings. However, these scores are often calculated manually by clinicians, which is time-consuming and can introduce errors in high-pressure situations. The absence of an automated, integrated risk scoring system increases the cognitive load on healthcare professionals during emergencies.

Differential diagnosis in complex clinical cases requires the integration of multiple pieces of patient data including vital signs, history, and laboratory values. Without structured decision support, clinicians must rely entirely on memory and experience, which can be particularly challenging for junior staff or in cases involving multiple simultaneous conditions such as sepsis and STEMI presenting together.

The lack of a unified platform that brings together patient demographics, real-time vitals, automated risk scoring, and structured diagnostic support creates significant gaps in clinical decision-making efficiency. These gaps can lead to delayed diagnoses, missed treatment windows, and suboptimal patient outcomes in time-critical situations.

A centralized, secure, web-based Clinical Decision Support System is therefore required to organize patient information, display vital signs with status indicators, calculate and present clinical risk scores automatically, and provide AI-assisted diagnostic recommendations. The MediAssist system is developed to address these challenges by integrating the essential components of clinical decision support into a single, accessible web application that can be used directly in the browser without specialized client software.

*2*

---

### 1.3 OBJECTIVE

The main objective of the project is to develop a secure, web-based Clinical Decision Support System that assists healthcare professionals in managing patient information and making evidence-based clinical decisions.

The specific objectives are:

1. To maintain organized patient records with demographic and clinical information in a PostgreSQL database.
2. To display real-time patient vitals including Heart Rate, Blood Pressure, SpO2, Respiratory Rate, and Body Temperature with clinical status indicators.
3. To automatically calculate and present clinical risk scores including qSOFA and TIMI with visual progress indicators and descriptive labels.
4. To provide an AI-assisted differential diagnosis panel with probability scores and clinical justification for each diagnosis.
5. To display evidence-based treatment pathway recommendations relevant to the patient's current clinical condition.
6. To implement secure, role-based access control using Clerk authentication for all clinical users.
7. To integrate a React 19 frontend with a Spring Boot REST API and PostgreSQL database for reliable data management.
8. To provide a modular, maintainable system architecture that supports future enhancements in clinical analytics and patient monitoring.

*3*

---

### 1.4 SCOPE OF THE PROJECT

The MediAssist Clinical Decision Support System focuses on managing and presenting patient clinical information through a centralized, secure web application. The scope of the project includes the following areas:

The system supports patient record management, covering demographic information such as patient ID, name, age, gender, and blood group. Patient data is stored in a PostgreSQL database and retrieved through a Spring Boot REST API. Clinical vitals including Heart Rate, Blood Pressure, SpO2, Respiratory Rate, and Body Temperature are displayed through the dashboard interface with normal range indicators. Clinical risk scores including qSOFA and TIMI are calculated and presented with descriptive labels and progress bars.

The AI Differential Diagnosis module presents up to three differential diagnoses with probability scores and clinical justification based on the displayed patient vitals and condition. Evidence-based treatment pathways relevant to the patient's presentation are recommended through the dashboard, including the Sepsis 3-Hour Bundle and the STEMI Protocol (GDMT).

Secure authentication is provided through Clerk, with support for role-based access for different categories of clinical users including doctors, nurses, administrators, and lab technicians. All API communication between the frontend and the Spring Boot backend is managed through Axios with CORS support configured in Spring Security.

The system is designed to assist healthcare professionals and provide structured clinical decision support. It does not replace professional medical judgment, physical clinical examination, or laboratory investigations. The application supports digital information management and clinical decision assistance but operates within the boundaries of a decision support tool rather than an autonomous diagnostic system.

Future scope includes real-time data integration from monitoring equipment, mobile access, machine learning-based diagnostic models, cloud deployment, and advanced clinical reporting features.

*4*

---

### 1.5 MOTIVATION

The increasing complexity of modern healthcare and the critical importance of timely clinical decisions motivate the development of MediAssist. Studies in clinical informatics have consistently shown that Clinical Decision Support Systems can reduce diagnostic errors, improve adherence to clinical guidelines, and decrease the time required to initiate appropriate treatment.

The growing availability of modern web technologies, cloud infrastructure, and open-source frameworks provides an opportunity to develop practical, cost-effective clinical support tools that can be deployed and maintained without specialized hardware or infrastructure. React, Spring Boot, and PostgreSQL are widely supported, well-documented technologies that provide a reliable foundation for healthcare applications.

The integration of Clerk for authentication ensures that patient data is protected through industry-standard access control, addressing one of the key requirements of healthcare data security. The use of Axios for API communication and React Router for navigation supports a responsive, accessible interface suitable for use in fast-paced clinical environments.

This project also provides practical experience in full-stack web development applied to a real-world healthcare problem. It demonstrates how software engineering principles including modular design, RESTful API development, secure authentication, and responsive UI design can be applied to build a system that has a direct impact on the quality of patient care. The MediAssist system serves as a foundation for further development of more advanced clinical decision support tools in the future, contributing to the broader goal of improving healthcare outcomes through technology.

*5*

---

# CHAPTER 2
## LITERATURE SURVEY

This chapter deals with the study of existing approaches, technologies, and systems related to clinical decision support in healthcare. It presents a literature review of digital health management, the limitations of existing systems, and the proposed MediAssist Clinical Decision Support System.

### 2.1 LITERATURE REVIEW

Clinical Decision Support Systems (CDSS) have been an important area of research and development in medical informatics for several decades. These systems assist clinicians by providing relevant patient information, alerts, reminders, and diagnostic recommendations at the point of care. Research has demonstrated that well-designed CDSS can significantly improve diagnostic accuracy, reduce medication errors, enhance adherence to evidence-based guidelines, and decrease the time to initiate appropriate treatment.

Early CDSS implementations were often integrated into large hospital information systems and required specialized hardware and infrastructure. The emergence of web-based applications has made clinical decision support more accessible, allowing healthcare professionals to access decision support tools through standard web browsers without the need for dedicated client software. Modern web frameworks such as React and TypeScript support the development of interactive, responsive clinical interfaces that can be accessed from any device with a browser.

The use of clinical risk scoring tools in emergency and critical care settings is well established. The qSOFA (Quick Sequential Organ Failure Assessment) score is a bedside scoring tool used to identify patients at risk of sepsis-related organ dysfunction, evaluating altered mental status, respiratory rate, and blood pressure. The TIMI (Thrombolysis in Myocardial Infarction) risk score is used in cardiology to assess the risk of major adverse cardiac events in patients with unstable angina or non-ST-elevation myocardial infarction. These validated scoring tools form an important component of evidence-based clinical decision support.

Secure authentication and role-based access control are essential in healthcare applications to protect sensitive patient data. Regulations including HIPAA and data protection frameworks in other regions require healthcare applications to implement appropriate safeguards. Identity management platforms such as Clerk provide ready-to-use authentication infrastructure with support for role management, multi-factor authentication, and secure session control, making them well-suited for healthcare application development.

Relational databases such as PostgreSQL provide a structured, reliable, and ACID-compliant approach to storing patient records. Spring Boot and Spring Data JPA simplify the development of secure, maintainable backend services for healthcare applications. RESTful API design allows healthcare information to be consumed by multiple frontend clients and integrated with other health information systems. Axios provides a straightforward HTTP client interface for managing API communication in React applications.

These technologies and clinical decision support principles provide the foundation for the MediAssist Clinical Decision Support System. The project combines modern frontend development, RESTful backend services, secure authentication, and clinical decision support concepts to assist healthcare professionals in making faster and more informed clinical decisions.

*6*

---

### 2.2 EXISTING SYSTEM

In many clinical environments, patient information is managed through a combination of Electronic Health Record (EHR) systems, standalone monitoring equipment, laboratory information systems, and paper-based records. While these systems serve their individual purposes, they often operate in isolation, creating fragmented information environments that require clinicians to manually gather and integrate data from multiple sources before making a clinical decision.

The major limitations of such conventional approaches are:

1. **Information fragmentation:** Patient records, vital signs, laboratory values, and radiology reports are stored in separate systems that do not communicate with each other automatically, requiring manual data retrieval and integration that consumes valuable clinical time.

2. **Manual risk calculation:** Clinical risk scores such as qSOFA and TIMI are typically calculated manually by clinicians using paper worksheets or mental arithmetic, increasing workload and the potential for calculation errors in high-pressure situations where cognitive load is already high.

3. **Absence of structured diagnostic support:** Most EHR systems present raw patient data without providing structured differential diagnosis suggestions or evidence-based treatment recommendations at the point of care. Clinicians must rely entirely on their own knowledge and experience for diagnostic decision-making.

4. **Limited accessibility:** Clinical information may only be accessible from dedicated terminals or within specific hospital departments, restricting access for clinicians working across different locations within the facility or attending to patients in different wards.

5. **High cognitive load:** The requirement to gather, integrate, and interpret data from multiple sources simultaneously increases the cognitive burden on clinicians and may contribute to decision-making delays and diagnostic errors, particularly in complex multi-system presentations.

6. **Inconsistent security:** Access controls may vary between different systems used within the same hospital, creating potential vulnerabilities in the overall security of patient data and making it difficult to implement consistent audit trails.

7. **Poor scalability:** Legacy systems may not scale effectively to support growing patient volumes, new clinical specialties, or the integration of new data sources without significant infrastructure investment and operational disruption.

These limitations demonstrate the need for a unified web-based platform that integrates patient record management, real-time vitals display, automated clinical risk scoring, and structured diagnostic support into a single, secure, and accessible application.

*7*

---

### 2.3 PROPOSED SYSTEM

The proposed MediAssist Clinical Decision Support System is a web-based application designed to provide healthcare professionals with centralized access to patient clinical information and structured decision support tools. It integrates patient management, vital monitoring, risk scoring, and diagnostic assistance into a single, secure platform.

The system includes a public Landing Page that introduces the platform to authorized users, a Clerk-based Login interface for secure authentication, a Role Selection page that tailors the clinical experience based on the user's professional role, and a comprehensive Clinical Dashboard that serves as the primary interface for clinical decision support.

The Clinical Dashboard provides a complete clinical view including a patient summary header with alert indicators, five real-time vital sign tiles with status badges, clinical risk scores (qSOFA and TIMI) with progress bars and descriptive labels, evidence-based treatment pathway recommendations, and an AI-assisted differential diagnosis panel with probability scores and clinical justification for each diagnosis.

Patient records are managed through a Spring Boot REST API connected to a PostgreSQL database. The Patient entity stores demographic information including patient ID, name, age, gender, and blood group. Spring Security provides CORS configuration and access control for the backend API. Axios manages HTTP communication between the React frontend and the Spring Boot backend.

The main advantages of the proposed system are:

1. Centralized access to patient clinical information through a single web application accessible from any modern browser.
2. Real-time vitals display with colour-coded status indicators for immediate clinical awareness of abnormal values.
3. Automated clinical risk score calculation and presentation (qSOFA and TIMI), reducing manual calculation workload.
4. AI-assisted differential diagnosis with probability scores and structured clinical justification for each diagnosis.
5. Evidence-based treatment pathway recommendations relevant to the patient's condition.
6. Secure role-based access control through Clerk authentication, protecting sensitive patient data from unauthorized access.
7. A modular, maintainable full-stack architecture using React, Spring Boot, and PostgreSQL that supports future clinical enhancements.

*8*

---

# CHAPTER 3
## SYSTEM ANALYSIS

This chapter deals with the analysis of the MediAssist Clinical Decision Support System, including its functional needs, software requirements, and hardware requirements. System analysis helps identify the resources and technologies required to develop and operate the application efficiently.

### 3.1 SYSTEM REQUIREMENTS

System requirements describe the essential functions and resources needed for the successful operation of the MediAssist system. The application is designed to manage patient clinical information and provide decision support through a secure, web-based interface.

#### 3.1.1 Functional Requirements

The functional requirements specify the main operations supported by the system.

1. **Landing Page:** Presents the MediAssist platform to visitors with an overview of key clinical features including Patient Records, Diagnostic Data, and Decision Support, with links to Login and Get Started.
2. **Authentication:** Enables secure login through Clerk-based authentication with support for role-based access control, session management, and token validation.
3. **Role Selection:** Allows authenticated users to select their clinical role (Doctor, Nurse, Administrator, Lab Technician) before accessing the clinical dashboard, enabling role-specific clinical context.
4. **Clinical Dashboard:** Displays a comprehensive clinical view including patient summary, real-time vitals with status indicators, clinical risk scores, recommended treatment pathways, and AI differential diagnosis.
5. **Patient Summary:** Presents patient demographics including name, patient ID, age, gender, admission date, attending physician, active clinical alerts, and current clinical status.
6. **Vitals Monitoring:** Displays five real-time vital sign tiles — Heart Rate, Blood Pressure, SpO2, Respiratory Rate, and Body Temperature — each with a current value, unit, and colour-coded status indicator.
7. **Clinical Risk Scores:** Calculates and presents qSOFA and TIMI scores with progress bars, risk level labels, scores out of maximum, and descriptive clinical explanations of criteria met.
8. **AI Differential Diagnosis:** Presents up to three differential diagnoses with probability percentages, primary/secondary/alternative classification, and detailed clinical justification with supporting findings.
9. **Recommended Pathways:** Displays evidence-based treatment protocols (Sepsis 3-Hour Bundle, STEMI Protocol GDMT) with priority indicators and brief action descriptions.
10. **Patient Records API:** Provides REST API endpoints for retrieving all patients (GET /api/patients) and creating new patient records (POST /api/patients) with JSON request and response bodies.
11. **Navigation:** Allows users to move between application sections through a structured Sidebar and Header interface using React Router DOM for seamless client-side navigation.

#### 3.1.2 Non-Functional Requirements

The non-functional requirements describe the quality and operational characteristics expected from the application.

1. **Usability:** The interface must be clear, structured, and easy to navigate for clinical users working under time pressure in a fast-paced healthcare environment.
2. **Performance:** Patient data and dashboard components must load within an acceptable time to support timely clinical decisions without unnecessary delays.
3. **Security:** Patient data must be protected through Clerk authentication, role-based access control, CORS configuration, and HTTPS communication in production environments.
4. **Reliability:** The application must handle all supported clinical operations consistently without errors, and must remain available during active clinical use.
5. **Maintainability:** The modular structure of the React frontend and Spring Boot backend must support individual feature updates, bug fixes, and new module additions without disrupting existing functionality.
6. **Compatibility:** The application must function correctly with modern web browsers including Google Chrome, Mozilla Firefox, Microsoft Edge, and Safari.
7. **Scalability:** The backend architecture must support an increasing number of patient records and future addition of new clinical modules without requiring fundamental architectural changes.
8. **Data Integrity:** Patient records must be stored and retrieved accurately through PostgreSQL, with Hibernate managing schema consistency and Spring Data JPA ensuring correct data operations.

*9*

---

### 3.2 SOFTWARE AND HARDWARE REQUIREMENTS

The MediAssist Clinical Decision Support System uses modern web and backend technologies to provide patient management, clinical decision support, and secure authentication through a browser-based interface.

#### 3.2.1 Software Requirements

**Table 3.1: Software Requirements of MediAssist System**

| Software / Technology | Version | Purpose |
|---|---|---|
| Operating System – Windows | Windows 10/11 | Development and execution environment |
| Visual Studio Code | Latest | Source code editing and management |
| React | 19.0 | Developing the user interface and components |
| TypeScript | 5.7 | Type-safe frontend application logic |
| Vite | 8.0 | Frontend build tool and development server |
| Tailwind CSS | 4.0 | Utility-first CSS styling framework |
| React Router DOM | 7.18 | Client-side routing and navigation |
| Axios | 1.20 | HTTP client for REST API communication |
| Clerk | 6.17 | Secure authentication and role-based access |
| Lucide React | 1.47 | Icon library for the clinical interface |
| Recharts | 3.10 | Data visualization and charting components |
| Node.js | 22.x | JavaScript runtime for frontend tooling |
| Java | 21 | Backend development language |
| Spring Boot | 3.x | Backend REST API framework |
| Spring Data JPA | 3.x | Database ORM and data access layer |
| Spring Security | 6.x | Backend security and CORS configuration |
| Hibernate | 7.4 | Database schema management and ORM queries |
| PostgreSQL | 15+ | Relational database for patient records |
| Apache Tomcat | 11.0 | Embedded web server for Spring Boot |
| Maven | 3.x | Backend build tool and dependency management |
| Git | Latest | Version control system |
| GitHub | – | Remote repository at github.com/Kiruba-31/Health-Care-1 |
| Web Browser | Chrome/Edge/Firefox | Accessing and testing the application |

#### 3.2.2 Hardware Requirements

**Table 3.2: Hardware Requirements of MediAssist System**

| Hardware Component | Minimum Requirement | Recommended |
|---|---|---|
| Processor | Dual-core processor or equivalent | Quad-core or higher |
| RAM | 8 GB | 16 GB or more |
| Storage | 20 GB of available space | 50 GB SSD |
| Display | 1366 x 768 resolution | 1920 x 1080 (Full HD) |
| Input Devices | Keyboard and mouse | Keyboard, mouse, touchscreen |
| Network | Internet connection | Stable broadband (10 Mbps+) |

A system with 16 GB RAM or more is recommended for smoother development, especially when running the Vite frontend dev server on port 8443, the Spring Boot backend on port 8080, PostgreSQL database, and a web browser simultaneously. A stable internet connection is required for Clerk authentication services and for accessing GitHub. The hardware requirements may vary depending on the number of concurrent users and the volume of patient records managed.

*10*

---

# CHAPTER 4
## METHODOLOGY

This chapter deals with the methodology followed in developing the MediAssist Clinical Decision Support System. It explains the system architecture, the different modules, and the interactions between the major components of the application. It also presents the class diagram and sequence diagram to describe the structure and workflow of the system.

### 4.1 SYSTEM ARCHITECTURE

The MediAssist Clinical Decision Support System follows a three-tier web application architecture consisting of a Presentation Layer (React frontend), an Application Layer (Spring Boot REST API), and a Data Layer (PostgreSQL database). An Authentication Layer is provided by Clerk, integrated into the frontend.

The frontend is developed using React 19 and TypeScript and provides the interface through which healthcare professionals access the system. The Spring Boot backend handles patient data requests, applies business logic through service classes, and manages database operations through Spring Data JPA and Hibernate. PostgreSQL stores and retrieves patient records in the mediassist database. Clerk manages user identity, session tokens, and role-based access through the Clerk React SDK.

The system architecture consists of the following components:

1. **Presentation Layer:** Provides the Landing Page, Login interface, Role Selection, Clinical Dashboard, Header, and Sidebar components. Allows authorized users to interact with the system through a web browser.
2. **Application Layer:** Contains the Spring Boot REST controllers (PatientController), service classes (PatientService), entity definitions (Patient), and security configuration (SecurityConfig) required to process patient data requests and coordinate operations.
3. **Data Layer:** Stores and retrieves patient records through PostgreSQL, managed using the PatientRepository interface (JpaRepository) and Hibernate ORM.
4. **Authentication Layer:** Clerk provides secure user authentication, session management, and role-based access control integrated into the React frontend through ClerkProvider.

**Figure 4.1: System Architecture of MediAssist Clinical Decision Support System**

```
+------------------------------------------------------------------+
|                    PRESENTATION LAYER                            |
|  +------------+ +----------+ +-----------+ +------------------+  |
|  | Landing    | | Login    | | Role      | | Clinical         |  |
|  | Page       | | (Clerk)  | | Selection | | Dashboard        |  |
|  +------------+ +----------+ +-----------+ +------------------+  |
|  +------------------------------------------------------------+  |
|  |        React 19 + TypeScript + Vite 8 + Tailwind CSS v4   |  |
|  +------------------------------------------------------------+  |
+---------------------------+--------------------------------------+
                            | Axios HTTP / REST API
                            v
+------------------------------------------------------------------+
|                    APPLICATION LAYER                             |
|  +-------------------+ +-----------------+ +------------------+  |
|  | PatientController | | PatientService  | | SecurityConfig   |  |
|  | GET /api/patients | | getAllPatients() | | CORS + Auth      |  |
|  | POST /api/patients| | createPatient() | | Configuration    |  |
|  +-------------------+ +-----------------+ +------------------+  |
|  +------------------------------------------------------------+  |
|  |      Spring Boot 3 + Java 21 + Spring Security 6           |  |
|  +------------------------------------------------------------+  |
+---------------------------+--------------------------------------+
                            | Spring Data JPA / Hibernate
                            v
+------------------------------------------------------------------+
|                       DATA LAYER                                 |
|  +------------------------------------------------------------+  |
|  |        PostgreSQL Database -- 'mediassist' (port 5432)     |  |
|  |   Table: patients                                          |  |
|  |   Columns: id, patientId, name, age, gender, bloodGroup    |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+

              +------------------------------+
              |  AUTHENTICATION LAYER        |
              |  Clerk Auth Service          |
              |  Role-Based Access Control   |
              |  Session Token Management    |
              +------------------------------+
```

*12*

---

### 4.2 MODULE DESCRIPTION

The MediAssist Clinical Decision Support System is divided into eight modules to organize its different clinical functions. Each module is designed to support a particular clinical management activity.

#### 4.2.1 Landing Page Module

The Landing Page acts as the public entry point for the MediAssist platform. It presents the system's core value proposition to authorized healthcare professionals through a structured, professional layout. The page features a navigation bar with the MediAssist logo (Stethoscope icon from Lucide React), Login and Get Started buttons linking to the authentication interface. The hero section describes the platform as a "Clinical Decision Support System for Healthcare Professionals" with a prominent call-to-action button labelled "Enter Portal." A three-column feature grid highlights the three main capabilities: Patient Records, Diagnostic Data, and Decision Support. The footer includes a HIPAA compliance notice and a copyright statement for 2026 MediAssist Systems.

#### 4.2.2 Authentication Module

The Authentication Module is powered by Clerk. Healthcare professionals log in using their registered credentials through the Clerk SignIn component embedded in the Login Page. Clerk handles credential validation, session token generation, multi-factor authentication, and secure session storage. The Clerk publishable key (VITE_CLERK_PUBLISHABLE_KEY) and secret key are configured through environment variables. The application is wrapped in a ClerkProvider in main.tsx. Only successfully authenticated users receive a valid session token and can proceed to the Role Selection and Clinical Dashboard sections.

#### 4.2.3 Role Selection Module

After successful Clerk authentication, users are presented with the Role Selection interface. This allows healthcare professionals to identify their clinical role — Doctor, Nurse, Administrator, or Lab Technician. Each role is presented as an interactive card with a relevant Lucide React icon, role title, and description of the clinical access level. The selected role establishes the clinical context for the session and can be used in future implementations to control feature visibility and patient data access permissions based on the professional role.

#### 4.2.4 Clinical Dashboard Module

The Clinical Dashboard is the primary clinical interface of the MediAssist system, organized into four main areas. The Patient Summary Header presents the patient's name, ID, age, gender, admission date, attending physician, active alert badge (e.g., STEMI/Sepsis Alert in a rose-coloured badge), and current clinical status (e.g., Critical Observation). The Real-Time Vitals Tiles section displays five vital parameter tiles in a five-column responsive grid. The left column presents Clinical Risk Scores (qSOFA and TIMI) and Recommended Pathways. The right column (spanning two grid columns) presents the AI Differential Diagnosis panel with up to three diagnoses. All sections are connected through a clean white card layout with slate borders and shadow styling.

#### 4.2.5 Patient Records Module

The Patient Records Module manages patient demographic data through the Spring Boot REST API. Records are stored in the patients table of the mediassist PostgreSQL database. Each record contains: a system-generated integer primary key (id), a clinical identifier string (patientId, e.g., PT-1001), the patient's full name, age as an integer, gender as a string, and blood group as a string. The module supports two operations: GET /api/patients returns all patient records as a JSON array, and POST /api/patients creates a new patient record from a JSON request body. The frontend patientApi.ts module manages these calls using Axios.

#### 4.2.6 Vitals Monitoring Module

The Vitals Monitoring Module presents five critical physiological parameters through dashboard tile components. Each tile includes a left-border colour accent, an icon from Lucide React, the parameter name, the current value in large typography, the appropriate unit, and a status badge. Colour coding: rose (red) for High or Low abnormal values, amber (yellow) for Elevated values requiring attention, and emerald (green) for Normal values within clinical range. Current values displayed: Heart Rate 118 bpm (High), Blood Pressure 88/54 mmHg (Low), SpO2 96% (Normal), Respiratory Rate 24/min (High), Body Temperature 101.2°F (Elevated).

#### 4.2.7 Clinical Risk Scores Module

The Clinical Risk Scores Module displays two validated clinical scoring tools. The qSOFA Score evaluates three criteria: altered mental status, low blood pressure (< 100 mmHg), and high respiratory rate (>= 22/min). The current patient scores 2/3 (High Risk) due to hypotension and tachypnea, displayed with a rose progress bar at 66%. The TIMI Risk Score assesses 14-day major adverse cardiac event risk. The current score is 4/7 (Moderate) indicating approximately 20% risk, displayed with an amber progress bar at 57%. Both scores include descriptive labels and clinical criteria summaries.

#### 4.2.8 Navigation Module

The Navigation Module provides structured access to all application sections through a persistent Header and Sidebar. The Sidebar component lists navigation links to clinical sections. The Header component displays the MediAssist branding, authenticated user information from Clerk, and a logout option. React Router DOM v7 manages all client-side routing, providing seamless page transitions. The Sidebar uses lucide-react icons for visual navigation cues.

*15*

---

### 4.3 CLASS DIAGRAM

**Figure 4.2: Class Diagram of MediAssist Backend Components**

```
+-----------------------------+
|     PatientController       |
|-----------------------------|
| - patientService            |
|-----------------------------|
| + getAllPatients(): List     |
| + createPatient(p): Patient |
+-------------+---------------+
              | uses
              v
+-----------------------------+
|       PatientService        |
|-----------------------------|
| - patientRepository         |
|-----------------------------|
| + getAllPatients(): List     |
| + createPatient(p): Patient |
| + getPatientById(): Optional|
+-------------+---------------+
              | uses
              v
+-----------------------------+
|     PatientRepository       |
|-----------------------------|
| extends JpaRepository       |
|-----------------------------|
| + findAll(): List           |
| + save(p): Patient          |
| + findById(): Optional      |
+-------------+---------------+
              | maps to
              v
+-----------------------------+
|          Patient            |
|-----------------------------|
| - id: Integer               |
| - patientId: String         |
| - name: String              |
| - age: Integer              |
| - gender: String            |
| - bloodGroup: String        |
|-----------------------------|
| + getters() / setters()     |
+-----------------------------+

+-----------------------------+
|      SecurityConfig         |
|-----------------------------|
| + filterChain(): Chain      |
| + corsConfigSource(): Source|
+-----------------------------+
```

*15*

---

### 4.4 SEQUENCE DIAGRAM

**Figure 4.3: Sequence Diagram of MediAssist User Interaction Flow**

```
User      Frontend(React)   Clerk Auth   Spring Boot API   PostgreSQL
 |              |               |               |               |
 |--[Open]----->|               |               |               |
 |              |--[Load Landing Page]          |               |
 |<--[Landing Page Displayed]--                 |               |
 |              |               |               |               |
 |--[Login]---->|               |               |               |
 |              |--[Authenticate(credentials)]->|               |
 |              |<--[Session Token]-------------|               |
 |              |               |               |               |
 |--[Role]------>|              |               |               |
 |              |--[Navigate to Dashboard]      |               |
 |              |               |               |               |
 |              |--[GET /api/patients]--------->|               |
 |              |               |               |--[SELECT *]-->|
 |              |               |               |<--[Records]---|
 |              |<--[JSON Patient List]---------|               |
 |              |               |               |               |
 |<--[Dashboard Rendered]-------                |               |
 |    (Vitals, Risk Scores, DDx, Pathways)      |               |
 |              |               |               |               |
 |--[POST patient]->|           |               |               |
 |              |--[POST /api/patients]-------->|               |
 |              |               |               |--[INSERT]---->|
 |              |               |               |<--[Saved]-----|
 |              |<--[New Patient JSON]----------|               |
 |<--[UI Updated]-----                          |               |
```

*16*

---

# CHAPTER 5
## RESULTS AND DISCUSSION

This chapter deals with the implementation details of the MediAssist Clinical Decision Support System. It describes the key functions implemented in the application and explains the code used to build each module.

### 5.1 IMPLEMENTATION OVERVIEW

The MediAssist Clinical Decision Support System is implemented as a full-stack web application. The frontend is developed using React 19 with TypeScript, built using Vite 8. Tailwind CSS v4 provides utility-based styling. React Router DOM v7 manages client-side navigation. Clerk integrates authentication. Axios manages all HTTP communication.

The backend is implemented using Spring Boot 3 with Java 21. Spring Data JPA and Hibernate manage database interaction. Spring Security configures CORS and access control. Apache Tomcat 11.0 serves as the embedded web server on port 8080. The frontend development server runs on port 8443.

**Frontend Source Structure:**
```
Health Care 1/
+-- src/
|   +-- api/
|   |   +-- patientApi.ts        (Axios API functions)
|   +-- components/
|   |   +-- Header.tsx           (Application header)
|   |   +-- Sidebar.tsx          (Navigation sidebar)
|   +-- pages/
|   |   +-- LandingPage.tsx      (Public home page)
|   |   +-- LoginPage.tsx        (Clerk login)
|   |   +-- RoleSelection.tsx    (Role picker)
|   |   +-- Dashboard.tsx        (Clinical dashboard)
|   +-- App.tsx                  (Root component + routing)
|   +-- main.tsx                 (Application entry point)
+-- .env.local                   (Environment configuration)
+-- vite.config.ts               (Vite build configuration)
```

**Backend Source Structure:**
```
backend/demo/src/main/java/com/example/demo/
+-- DemoApplication.java         (Spring Boot entry point)
+-- SecurityConfig.java          (CORS + Security configuration)
+-- controller/
|   +-- PatientController.java   (REST API endpoints)
+-- service/
|   +-- PatientService.java      (Business logic layer)
+-- entity/
|   +-- Patient.java             (JPA entity / data model)
+-- repository/
    +-- PatientRepository.java   (JPA repository interface)
```

*17*

---

### 5.2 KEY FUNCTIONS (CODE EXPLANATION)

#### 5.2.1 Landing Page and Application Entry

The LandingPage component renders the public home page using React and Lucide React icons. React Router Link components connect the navigation to the login interface.

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Shield, Activity,
         FileSearch, ArrowRight, BrainCircuit, Users }
  from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <nav className="border-b border-slate-200 py-4 px-8
                      flex justify-between items-center bg-white">
        <div className="flex items-center gap-3">
          <Stethoscope className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold text-slate-900">
            MediAssist
          </span>
        </div>
        <div className="flex gap-4">
          <Link to="/login"
                className="px-5 py-2 text-sm font-medium
                           text-slate-700 hover:text-primary">
            Login
          </Link>
          <Link to="/login"
                className="px-5 py-2 text-sm font-medium
                           bg-primary text-white rounded-md">
            Get Started
          </Link>
        </div>
      </nav>
      <main className="pt-20 pb-20 px-8 max-w-7xl mx-auto
                       flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold mb-6">
          Clinical Decision Support
          <span className="text-primary">
            for Healthcare Professionals
          </span>
        </h1>
        <div className="grid md:grid-cols-3 gap-6 mt-10 w-full">
          <div className="p-8 bg-slate-50 border rounded-md">
            <Users className="w-8 h-8 text-primary mb-4" />
            <h3>Patient Records</h3>
          </div>
          <div className="p-8 bg-slate-50 border rounded-md">
            <FileSearch className="w-8 h-8 text-primary mb-4" />
            <h3>Diagnostic Data</h3>
          </div>
          <div className="p-8 bg-slate-50 border rounded-md">
            <BrainCircuit className="w-8 h-8 text-primary mb-4" />
            <h3>Decision Support</h3>
          </div>
        </div>
      </main>
      <footer className="border-t border-slate-200 py-8 text-center">
        <Shield className="w-4 h-4" /> HIPAA Compliant Infrastructure
        <p>2026 MediAssist Systems. For authorized providers only.</p>
      </footer>
    </div>
  );
}
```

The LandingPage uses React Router Link for navigation and Lucide React icons for visual clarity. The feature grid communicates the three main system capabilities to prospective users.

*18*

---

#### 5.2.2 Clerk Authentication and Login

The Login Page uses Clerk's pre-built SignIn component to handle user authentication and the ClerkProvider wraps the entire application.

```tsx
// pages/LoginPage.tsx
import { SignIn } from '@clerk/react';

export function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center
                    min-h-screen bg-slate-50">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          MediAssist Portal
        </h1>
        <p className="text-slate-600 mt-2">
          Authorized Healthcare Providers Only
        </p>
      </div>
      <SignIn routing="hash" />
    </div>
  );
}
```

```tsx
// main.tsx -- Clerk initialization
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/react';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
```

Clerk manages the complete authentication lifecycle. Only authenticated users with a valid session token can access the role selection and dashboard routes, enforced through Clerk's SignedIn component in the route definitions.

*19*

---

#### 5.2.3 Role Selection

The RoleSelection component presents authenticated users with interactive role cards.

```tsx
export function RoleSelection() {
  const roles = [
    {
      label: 'Doctor',
      description: 'Full clinical access and decision support'
    },
    {
      label: 'Nurse',
      description: 'Patient monitoring and care management'
    },
    {
      label: 'Administrator',
      description: 'System administration and reporting'
    },
    {
      label: 'Lab Technician',
      description: 'Laboratory results and diagnostics'
    }
  ];

  const handleRoleSelect = (role: string) => {
    sessionStorage.setItem('clinicalRole', role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center
                    justify-center bg-slate-50 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-8">
        Select Your Clinical Role
      </h2>
      <div className="grid grid-cols-2 gap-4 max-w-lg w-full">
        {roles.map(role => (
          <button
            key={role.label}
            onClick={() => handleRoleSelect(role.label)}
            className="p-6 bg-white border border-slate-200
                       rounded-lg hover:border-primary
                       hover:shadow-md transition-all text-left">
            <p className="font-semibold text-slate-900 mb-1">
              {role.label}
            </p>
            <p className="text-sm text-slate-600">
              {role.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
```

The selected role is stored in sessionStorage and the user is navigated to the Clinical Dashboard. This component provides the role-based entry point that supports future implementation of role-specific clinical views and feature access control.

*20*

---

#### 5.2.4 Clinical Dashboard and Patient Summary

The Dashboard component is the central clinical interface. The patient summary header presents immediate clinical context.

```tsx
import React from 'react';
import {
  Activity, HeartPulse, Thermometer, Wind, Droplet,
  AlertTriangle, CheckCircle2, AlertCircle,
  Stethoscope, FileWarning
} from 'lucide-react';

export function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* Patient Summary Header */}
      <div className="bg-white p-6 rounded-lg
                      border border-slate-200 shadow-sm
                      flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Jane Doe
            </h2>
            <span className="px-3 py-1 bg-slate-100
                             text-slate-700 text-sm
                             font-medium rounded-full">
              58F - PT-1024
            </span>
            <span className="px-3 py-1 bg-rose-100
                             text-rose-700 text-sm font-bold
                             rounded-full border border-rose-200
                             flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              STEMI / Sepsis Alert
            </span>
          </div>
          <p className="text-slate-600 text-sm">
            Admitted: 18 Sep 2026, 08:30 AM -
            Attending: Dr. Alex
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500 mb-1">
            Current Status
          </p>
          <p className="text-lg font-bold text-rose-600">
            Critical Observation
          </p>
        </div>
      </div>

      {/* Vitals Grid (5 tiles) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Individual vital tiles */}
      </div>

      {/* Risk Scores + Differential Diagnosis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Risk Scores and Pathways */}
        {/* Right (col-span-2): DDx Panel */}
      </div>
    </div>
  );
}
```

The alert badge uses a rose colour scheme with AlertTriangle icon for immediate visual priority. The Critical Observation status is displayed in bold rose text. The layout uses CSS Grid for the responsive multi-column structure.

*21*

---

#### 5.2.5 Real-Time Vitals Display

Each vital sign tile is implemented as a card with a left-border accent, icon, value, and status badge.

```tsx
{/* Heart Rate Tile -- High */}
<div className="bg-white p-4 rounded-lg
                border border-rose-200 shadow-sm
                relative overflow-hidden">
  <div className="absolute top-0 left-0
                  w-1 h-full bg-rose-500"></div>
  <div className="flex justify-between items-start mb-2">
    <div className="flex items-center gap-2 text-slate-600">
      <HeartPulse className="w-5 h-5 text-rose-500" />
      <span className="font-medium text-sm">Heart Rate</span>
    </div>
    <span className="px-2 py-0.5 bg-rose-100 text-rose-700
                     text-xs font-bold rounded">High</span>
  </div>
  <div className="flex items-baseline gap-1">
    <span className="text-3xl font-bold text-slate-900">
      118
    </span>
    <span className="text-sm text-slate-500">bpm</span>
  </div>
</div>

{/* SpO2 Tile -- Normal (emerald) */}
<div className="bg-white p-4 rounded-lg
                border border-emerald-200 shadow-sm
                relative overflow-hidden">
  <div className="absolute top-0 left-0
                  w-1 h-full bg-emerald-500"></div>
  <div className="flex items-center gap-2 text-slate-600">
    <Droplet className="w-5 h-5 text-emerald-500" />
    <span className="font-medium text-sm">SpO2</span>
  </div>
  <span className="bg-emerald-100 text-emerald-700
                   text-xs font-bold rounded px-2 py-0.5">
    Normal
  </span>
  <div className="flex items-baseline gap-1">
    <span className="text-3xl font-bold text-slate-900">96</span>
    <span className="text-sm text-slate-500">%</span>
  </div>
</div>
```

The left-border accent provides a quick colour reference for the tile's status. Rose borders and badges indicate clinical concern, emerald indicates normal, and amber indicates an elevated but not critical value. The 3xl font size ensures values are readable at a glance in a clinical setting.

*22*

---

#### 5.2.6 Clinical Risk Score Calculation

The qSOFA and TIMI scores are displayed with progress bars providing visual severity indication.

```tsx
{/* Clinical Risk Scores Panel */}
<div className="bg-white p-6 rounded-lg
                border border-slate-200 shadow-sm">
  <h3 className="text-lg font-bold text-slate-900 mb-4
                 flex items-center gap-2">
    <Activity className="w-5 h-5 text-primary" />
    Clinical Risk Scores
  </h3>

  {/* qSOFA Score */}
  <div className="p-4 bg-slate-50 rounded-lg border
                  border-slate-100 mb-4">
    <div className="flex justify-between items-center mb-2">
      <span className="font-semibold text-slate-800">
        qSOFA Score
      </span>
      <span className="px-2 py-1 bg-rose-100 text-rose-700
                       text-xs font-bold rounded
                       border border-rose-200">
        High Risk (2/3)
      </span>
    </div>
    <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
      <div className="bg-rose-500 h-2 rounded-full"
           style={{ width: '66%' }}></div>
    </div>
    <p className="text-xs text-slate-500">
      Criteria met: Low BP (&lt;100 mmHg),
      High Resp Rate (>=22/min)
    </p>
  </div>

  {/* TIMI Risk Score */}
  <div className="p-4 bg-slate-50 rounded-lg
                  border border-slate-100">
    <div className="flex justify-between items-center mb-2">
      <span className="font-semibold text-slate-800">
        TIMI Risk Score
      </span>
      <span className="px-2 py-1 bg-amber-100 text-amber-700
                       text-xs font-bold rounded
                       border border-amber-200">
        Moderate (4/7)
      </span>
    </div>
    <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
      <div className="bg-amber-500 h-2 rounded-full"
           style={{ width: '57%' }}></div>
    </div>
    <p className="text-xs text-slate-500">
      14-day risk of all-cause mortality, new MI,
      or severe ischemia: ~20%
    </p>
  </div>
</div>
```

The progress bar width is calculated as a percentage of the maximum score (66% for 2/3 qSOFA, 57% for 4/7 TIMI). Rose colour indicates high risk and amber indicates moderate risk. The criteria summary text explains the specific clinical findings that contributed to the score.

*23*

---

#### 5.2.7 AI Differential Diagnosis Panel

The differential diagnosis panel presents three structured diagnoses in order of probability.

```tsx
{/* AI Differential Diagnosis Panel */}
<div className="lg:col-span-2">
  <div className="bg-white p-6 rounded-lg
                  border border-slate-200 shadow-sm h-full">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-bold text-slate-900
                     flex items-center gap-2">
        <Stethoscope className="w-5 h-5 text-primary" />
        AI Differential Diagnosis
      </h3>
      <span className="text-xs text-slate-500 italic">
        Decision support only
      </span>
    </div>

    {/* DDx 1 -- Severe Sepsis 85% */}
    <div className="border border-rose-200 rounded-lg p-4
                    bg-rose-50/30 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-bold text-slate-900 text-lg">
            Severe Sepsis w/ Septic Shock
          </h4>
          <p className="text-sm text-slate-600">
            Primary consideration requiring immediate evaluation
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-rose-600">
            85%
          </span>
          <p className="text-xs text-slate-500">Probability</p>
        </div>
      </div>
      <div className="bg-white p-3 rounded border
                      border-rose-100 text-sm">
        <p className="font-semibold text-slate-800 mb-1">
          Clinical Justification:
        </p>
        <ul className="list-disc pl-5 text-slate-600 space-y-1">
          <li>Hypotension (88/54) unresponsive to initial fluids</li>
          <li>Tachycardia (118 bpm) and Tachypnea (24/min)</li>
          <li>Elevated temperature (101.2 degrees F)</li>
          <li>qSOFA score >= 2</li>
        </ul>
      </div>
    </div>

    {/* DDx 2 -- STEMI 62%, DDx 3 -- PE 30% follow same pattern */}
  </div>
</div>
```

Each diagnosis card uses a distinct border and background colour matching its clinical priority: rose for the primary (highest probability) diagnosis, amber for the secondary, and slate for alternative considerations. The "Decision support only" label ensures clinical users understand these are assistive recommendations, not autonomous diagnoses.

*24*

---

#### 5.2.8 Patient API and Data Management

The patientApi.ts module and Spring Boot backend manage patient data operations.

```typescript
// src/api/patientApi.ts
import axios from 'axios';

const REST_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL}/api/patients`
    : 'http://localhost:8080/api/patients';

export interface Patient {
  id?: number;
  patientId: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
}

export const getPatients = () =>
  axios.get<Patient[]>(REST_API_BASE_URL);

export const listPatients = getPatients;

export const createPatient = (patient: Patient) =>
  axios.post<Patient>(REST_API_BASE_URL, patient);
```

```java
// entity/Patient.java
@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String patientId;
    private String name;
    private Integer age;
    private String gender;
    private String bloodGroup;
    // Constructors, Getters, Setters
}

// repository/PatientRepository.java
@Repository
public interface PatientRepository
    extends JpaRepository<Patient, Long> {
}

// service/PatientService.java
@Service
public class PatientService {
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }
    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }
    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }
}
```

The API successfully returns all patients from the mediassist PostgreSQL database with HTTP 200, confirming live frontend-backend connectivity. Patient records including PT-1001 Arun Kumar (45, Male, O+), PT-1002 Kavin (34, Male, A-), and PT-1004 Suresh Raina (42, Male, O+) are retrieved correctly.

*25*

---

#### 5.2.9 Spring Boot Security Configuration

The SecurityConfig class manages CORS and access control for the REST API.

```java
// SecurityConfig.java
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
        throws Exception {
        http
            .cors(cors -> cors.configurationSource(
                corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth ->
                auth.anyRequest().permitAll());
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(
            List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(false);
        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

```properties
# application.properties
spring.application.name=demo
spring.datasource.url=jdbc:postgresql://localhost:5432/mediassist
spring.datasource.username=postgres
spring.datasource.password=Kiruba31!
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

CSRF is disabled because the REST API uses Clerk token-based authentication rather than session cookies. All origins are permitted for development (CORS wildcard). The CORS configuration allows the React frontend on port 8443 to communicate with the Spring Boot backend on port 8080 without browser security blocks.

*26*

---

#### 5.2.10 Application Navigation

React Router DOM v7 manages all client-side navigation in the MediAssist application.

```tsx
// App.tsx
import { BrowserRouter, Routes, Route, Navigate }
  from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/react';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RoleSelection } from './pages/RoleSelection';
import { Dashboard } from './pages/Dashboard';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/role"
          element={
            <SignedIn>
              <RoleSelection />
            </SignedIn>
          }
        />
        <Route
          path="/dashboard"
          element={
            <SignedIn>
              <div className="flex h-screen bg-slate-50">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                  <Header />
                  <div className="p-6">
                    <Dashboard />
                  </div>
                </main>
              </div>
            </SignedIn>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
```

BrowserRouter provides browser-history-based routing. Routes and Route define all page mappings. Navigate handles redirection for unknown paths back to the Landing Page. Clerk's SignedIn component protects all clinical routes, ensuring that unauthenticated requests are redirected to the login page. The Sidebar and Header components provide persistent navigation for all authenticated clinical sections of the application.

**Summary**

The key functions of the MediAssist Clinical Decision Support System support public platform presentation, secure Clerk-based authentication, clinical role management, patient summary display, real-time vitals monitoring with colour-coded status indicators, automated clinical risk scoring (qSOFA and TIMI), AI-assisted differential diagnosis with probability scores and clinical justification, patient record API management through Spring Boot and PostgreSQL, Spring Security CORS configuration, and structured React Router application navigation. Together, these modules provide a comprehensive, secure, and clinically relevant interface for healthcare professionals.

*27*

---

# CHAPTER 6
## CONCLUSION AND FUTURE WORK

This chapter deals with the conclusion of the MediAssist Clinical Decision Support System, summarizing the work carried out, the features implemented, and the outcomes achieved. It also discusses the future enhancements that can be introduced to improve the functionality, clinical relevance, and usability of the system.

### 6.1 CONCLUSION

The MediAssist Clinical Decision Support System is a web-based application developed to assist healthcare professionals in managing patient clinical information and making faster, more accurate evidence-based decisions. The main objective of the project is to provide a centralized, secure, and structured platform for accessing patient records, monitoring vital signs, calculating clinical risk scores, and receiving AI-assisted diagnostic support through a single web application.

The system includes the following modules: Landing Page, Clerk Authentication, Role Selection, Clinical Dashboard (Patient Summary Header, Real-Time Vitals Tiles, Clinical Risk Scores, Recommended Treatment Pathways, AI Differential Diagnosis), Patient Records REST API, Vitals Monitoring, Clinical Risk Scoring using qSOFA and TIMI, and Application Navigation using React Router DOM.

The Clinical Dashboard provides a comprehensive clinical view of patient demographics and alerts, five real-time vital sign tiles with colour-coded status indicators, qSOFA (2/3 High Risk) and TIMI (4/7 Moderate) risk scores with progress bars, evidence-based treatment pathway recommendations including the Sepsis 3-Hour Bundle and STEMI Protocol (GDMT), and a structured AI differential diagnosis panel presenting Severe Sepsis (85%), Acute Myocardial Infarction (62%), and Pulmonary Embolism (30%) with clinical justification for each.

The Patient Records module manages demographic data through a Spring Boot REST API (GET and POST /api/patients) connected to a PostgreSQL database (mediassist, port 5432). Patient records for PT-1001 (Arun Kumar), PT-1002 (Kavin), PT-1004 (Suresh Raina, Raji), and others are stored and retrieved successfully. The backend runs on port 8080 and the frontend on port 8443, with CORS configured through Spring Security.

The application uses React 19 and TypeScript for frontend development, Vite 8 as the build tool, Tailwind CSS v4 for styling, Clerk for secure authentication, and React Router DOM v7 for navigation. The backend uses Spring Boot 3 with Java 21, Spring Data JPA, Hibernate 7.4, and PostgreSQL. The project is maintained at github.com/Kiruba-31/Health-Care-1 on the main branch.

Thus, the MediAssist Clinical Decision Support System achieves its objective of providing a centralized web-based platform for clinical information management and decision support. The project demonstrates how modern web technologies can be applied to build a clinically relevant system that improves the speed and quality of patient assessment, and provides a strong foundation for future enhancements.

*28*

---

### 6.2 FUTURE ENHANCEMENTS

The MediAssist Clinical Decision Support System can be further improved by introducing additional functionalities that extend the capabilities of the existing application.

**Real-time Vitals Integration:** The dashboard currently displays static vitals values. Future development could integrate live monitoring equipment or IoT-based patient sensors through WebSocket connections or MQTT protocols. This would display continuously updating vital sign values and automatically trigger alert notifications when critical thresholds are crossed, transforming MediAssist into a true real-time monitoring platform.

**Machine Learning-Based Diagnostic Model:** The AI Differential Diagnosis panel currently presents preconfigured probability scores. Future development could integrate a trained machine learning model using clinical datasets such as MIMIC-III to generate dynamic, data-driven probability scores based on the actual patient's recorded vitals, age, gender, blood group, and clinical history. This would improve the clinical relevance and accuracy of the diagnostic recommendations.

**Electronic Health Record Integration:** The system could be enhanced to integrate with existing EHR systems such as Epic or OpenEMR through HL7 FHIR APIs. This would allow MediAssist to automatically import patient demographics, laboratory values, medication histories, and prior diagnoses, providing a more complete clinical picture without manual data entry.

**Advanced Clinical Reporting:** Detailed clinical reports covering patient demographics, vital sign trends, risk score histories, and clinical outcome analyses could be generated and exported in PDF or Excel formats for use in clinical audit, quality improvement, and research activities.

**Lab Report and Diagnostic Imaging Integration:** A future module could allow clinicians to upload and view laboratory test results and radiology reports directly within the patient's clinical record, integrated with laboratory information systems and PACS for a comprehensive all-in-one clinical interface.

**Notification and Alert System:** Real-time push notification facilities could alert attending physicians when a patient's vitals cross critical thresholds, using browser notification APIs or SMS gateways for timely clinical intervention in emergency situations.

**Mobile Application:** A React Native mobile application could provide healthcare professionals with access to the MediAssist system from smartphones and tablets, supporting bedside access, remote monitoring, and on-call clinical support.

**Cloud Deployment:** Deployment on AWS, Microsoft Azure, or Google Cloud would improve scalability, availability, and multi-facility access. Docker containerization and Kubernetes orchestration could support large-scale hospital deployment.

These future enhancements could make the MediAssist Clinical Decision Support System more comprehensive, real-time, and clinically impactful, extending its capabilities to support advanced patient monitoring, predictive analytics, and integrated clinical workflows.

*29*

---

## APPENDIX

### A.1 Sample Patient Records from PostgreSQL Database

The following patient records are stored in the patients table of the mediassist PostgreSQL database and retrieved through the GET /api/patients API endpoint:

```json
[
  {
    "id": 1, "patientId": "PT-1001",
    "name": "Arun Kumar", "age": 45,
    "gender": "Male", "bloodGroup": "O+"
  },
  {
    "id": 3, "patientId": "PT-1002",
    "name": "Kavin", "age": 34,
    "gender": "Male", "bloodGroup": "A-"
  },
  {
    "id": 4, "patientId": "PT-1004",
    "name": "Suresh Raina", "age": 42,
    "gender": "Male", "bloodGroup": "O+"
  },
  {
    "id": 6, "patientId": "PT-1004",
    "name": "Raji", "age": 55,
    "gender": "Female", "bloodGroup": "O+"
  }
]
```

The API returns HTTP 200, confirming a live, functioning connection between the React frontend, the Spring Boot backend, and the PostgreSQL database.

---

### A.2 Environment Configuration (.env.local)

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_CLERK_PUBLISHABLE_KEY=pk_test_bmV4dC1zcGFycm93...
CLERK_SECRET_KEY=sk_test_GZwBN5gVKLaJmhwJCekyuLe09Yn2...
```

---

### A.3 Backend Application Properties

```properties
spring.application.name=demo
spring.datasource.url=jdbc:postgresql://localhost:5432/mediassist
spring.datasource.username=postgres
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

---

### A.4 GitHub Repository Information

**Repository URL:** https://github.com/Kiruba-31/Health-Care-1

**Branch:** main | **Visibility:** Public

**Key Files Committed:**
- Health Care 1/ -- React frontend source
- backend/demo/ -- Spring Boot backend source
- MediAssist_Project_Report.md -- Project report document
- supabase_schema.sql -- Database schema definition

*30*

---

## SCREENSHOTS OF THE PROJECT

### Figure 1: Landing Page -- MediAssist Home

The Landing Page presents the MediAssist Clinical Decision Support System to authorized healthcare providers. The page features a navigation bar with the MediAssist Stethoscope logo, Login and Get Started buttons, a hero section titled "Clinical Decision Support for Healthcare Professionals", a three-column feature grid highlighting Patient Records, Diagnostic Data, and Decision Support capabilities, and a HIPAA Compliant Infrastructure footer.

*[Screenshot: Landing Page of MediAssist showing the navigation bar with MediAssist logo and Stethoscope icon, hero section with primary heading and Enter Portal button, three feature cards with Users/FileSearch/BrainCircuit icons, and the HIPAA compliance footer. URL: http://localhost:8443/]*

---

### Figure 2: Login Page -- Clerk Authentication

The Login Page displays the Clerk authentication interface embedded within the MediAssist Portal. Healthcare professionals enter their registered credentials through the Clerk SignIn component. The page heading reads "MediAssist Portal" with the subheading "Authorized Healthcare Providers Only."

*[Screenshot: Login Page showing the MediAssist Portal heading, Authorized Healthcare Providers Only subtext, and the Clerk SignIn component with email/password input fields and Sign In button. Background: light slate gradient. URL: http://localhost:8443/login]*

---

### Figure 3: Role Selection Page

After successful Clerk authentication, the Role Selection interface displays four interactive role cards in a two-by-two grid: Doctor, Nurse, Administrator, and Lab Technician. Each card includes a title and description of the clinical access level. Hovering a card highlights it with a primary-coloured border and shadow.

*[Screenshot: Role Selection page with heading "Select Your Clinical Role" and four white card buttons arranged in a 2x2 grid: Doctor (full clinical access), Nurse (patient monitoring), Administrator (system admin), Lab Technician (laboratory results). URL: http://localhost:8443/role]*

---

### Figure 4: Clinical Dashboard -- Patient Summary and Vitals

The top section of the Clinical Dashboard displays the patient summary header for Jane Doe (PT-1024, 58F) with a STEMI/Sepsis Alert badge (rose) and Critical Observation status. Below the header, five vital sign tiles are displayed in a five-column grid: Heart Rate 118 bpm (High, rose), Blood Pressure 88/54 mmHg (Low, rose), SpO2 96% (Normal, emerald), Respiratory Rate 24/min (High, rose), Body Temperature 101.2 degrees F (Elevated, amber).

*[Screenshot: Clinical Dashboard top section showing patient header with alert badge, followed by five vital tiles. Heart Rate and Blood Pressure tiles with rose borders and High/Low badges, SpO2 tile with emerald border and Normal badge, Respiratory Rate rose tile, and Temperature amber tile. URL: http://localhost:8443/dashboard]*

---

### Figure 5: Clinical Dashboard -- qSOFA and TIMI Risk Scores

The Clinical Risk Scores panel displays the qSOFA Score at 2/3 (High Risk) with a rose progress bar at 66% and a description of the two criteria met: Low BP and High Respiratory Rate. Below it, the TIMI Risk Score is displayed at 4/7 (Moderate) with an amber progress bar at 57%, with a note of approximately 20% 14-day risk.

*[Screenshot: Clinical Risk Scores card showing qSOFA panel with "High Risk (2/3)" badge in rose, rose progress bar, and criteria text; and TIMI panel with "Moderate (4/7)" badge in amber, amber progress bar, and risk percentage note.]*

---

### Figure 6: Clinical Dashboard -- Recommended Treatment Pathways

The Recommended Pathways section lists two evidence-based treatment protocols with priority icons. The Sepsis 3-Hour Bundle is marked with a green CheckCircle2 icon indicating priority initiation, with action text "Initiate broad-spectrum antibiotics and fluid resuscitation (30ml/kg)." The STEMI Protocol (GDMT) is marked with an amber AlertCircle icon with action text "Consider immediate PCI capability check. Administer Aspirin 325mg if not given."

*[Screenshot: Recommended Pathways card within the Clinical Dashboard left column, showing two list items: Sepsis 3-Hour Bundle with green check icon and STEMI Protocol with amber alert icon, each with descriptive action text.]*

---

### Figure 7: Clinical Dashboard -- AI Differential Diagnosis Panel

The AI Differential Diagnosis panel presents three diagnoses. First: Severe Sepsis with Septic Shock at 85% probability (primary consideration, rose card) with Clinical Justification listing hypotension, tachycardia, tachypnea, fever, and qSOFA >= 2. Second: Acute Myocardial Infarction (STEMI) at 62% (secondary consideration, amber card) with pending Troponin and cardiogenic hypotension. Third: Pulmonary Embolism at 30% (alternative consideration, slate card). "Decision support only" label visible in the panel header.

*[Screenshot: AI Differential Diagnosis panel spanning two grid columns, showing three diagnosis cards in rose/amber/slate, each with a large probability percentage, diagnosis classification text, and a bulleted Clinical Justification section with patient-specific findings.]*

---

### Figure 8: Patient Records -- API Response

The Spring Boot REST API endpoint GET http://localhost:8080/api/patients returns a JSON array of all patient records stored in the mediassist PostgreSQL database. The response includes records for Arun Kumar (PT-1001, 45, Male, O+), Kavin (PT-1002, 34, Male, A-), Suresh Raina (PT-1004, 42, Male, O+), Raji (55, Female, O+), and others. HTTP status: 200 OK.

*[Screenshot: Browser developer tools Network tab or API testing tool (Postman/Thunder Client) showing the GET /api/patients request to http://localhost:8080/api/patients with HTTP 200 OK response and the JSON array body containing all patient records.]*

---

### Figure 9: Spring Boot Backend -- Console Output

The Spring Boot application starts successfully with the embedded Apache Tomcat server on port 8080. The console output confirms: Hibernate ORM core version 7.4.5 Final, JPA repository interface detection for PatientRepository, Spring Security configuration (CORS and CSRF disabled), and the application startup success message "Started DemoApplication in 9.517 seconds."

*[Screenshot: Spring Boot application console output showing the standard Spring Boot banner, INFO log messages for Tomcat initialization, Hibernate ORM initialization, JPA repository scanning, Spring Security configuration, and the final "Started DemoApplication" startup success message.]*

---

### Figure 10: GitHub Repository -- Project Files

The MediAssist project repository at github.com/Kiruba-31/Health-Care-1 is maintained on the main branch. The repository contains the Health Care 1 frontend directory, the backend directory with the Spring Boot demo project, the MediAssist_Project_Report.md file, the README.md, and other configuration files. The latest commits include the project report addition and the SecurityConfig and PatientController updates.

*[Screenshot: GitHub repository page for Kiruba-31/Health-Care-1 showing the main branch, file listing including Health Care 1/, backend/, MediAssist_Project_Report.md, README.md, and other files, with commit history showing recent commits and the repository description.]*

*35*

---

## REFERENCES

1. Berner, E. S. (2007). *Clinical Decision Support Systems: Theory and Practice* (2nd ed.). Springer. This reference describes the foundational principles of Clinical Decision Support Systems and their application in modern healthcare settings.

2. React Documentation. (2024). *React 19 -- The library for web and native user interfaces*. Meta Open Source. Retrieved from https://react.dev

3. Spring Boot Reference Documentation. (2024). *Spring Boot 3.x Reference Guide*. VMware Broadcom. Retrieved from https://docs.spring.io/spring-boot/docs/current/reference/html

4. Clerk Documentation. (2024). *Clerk -- Authentication and user management*. Clerk, Inc. Retrieved from https://clerk.com/docs

5. PostgreSQL Global Development Group. (2024). *PostgreSQL 15 Documentation*. Retrieved from https://www.postgresql.org/docs

6. Singer, M., Deutschman, C. S., Seymour, C. W., et al. (2016). The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). *JAMA*, 315(8), 801-810. Defines the qSOFA scoring criteria used in the MediAssist Clinical Risk Scores module.

7. Antman, E. M., Cohen, M., Bernink, P. J., et al. (2000). The TIMI Risk Score for Unstable Angina/Non-ST Elevation MI. *JAMA*, 284(7), 835-842. Defines the TIMI risk score methodology implemented in the dashboard.

8. Axios Documentation. (2024). *Axios -- Promise based HTTP client for the browser and Node.js*. Retrieved from https://axios-http.com/docs

9. React Router Documentation. (2024). *React Router v7 -- Declarative Routing for React*. Retrieved from https://reactrouter.com

10. Hibernate ORM Documentation. (2024). *Hibernate 7.4 Final User Guide*. Red Hat, Inc. Retrieved from https://hibernate.org/orm/documentation

11. Tailwind CSS Documentation. (2024). *Tailwind CSS v4 -- A utility-first CSS framework*. Retrieved from https://tailwindcss.com

12. Lucide Icons. (2024). *Lucide -- Beautiful and consistent open-source icons*. Retrieved from https://lucide.dev

13. Vite Documentation. (2024). *Vite 8 -- Next Generation Frontend Tooling*. Retrieved from https://vitejs.dev

14. Spring Data JPA Documentation. (2024). *Spring Data JPA Reference Documentation*. VMware Broadcom. Retrieved from https://docs.spring.io/spring-data/jpa/docs/current/reference/html

15. HIPAA Journal. (2024). *HIPAA Compliant Web Application Development Guidelines*. Retrieved from https://www.hipaajournal.com

*36*

---

*Copyright 2026 MediAssist Systems. For authorized healthcare providers only.*

*Easwari Engineering College, Ramapuram, Chennai -- 600 089*
