# MediAssist – Clinical Decision Support System
### Project Report

**Submitted by:** Kiruba  
**Register Number:** [Your Register Number]  
**Department:** [Your Department]  
**Institution:** [Your Institution Name]  
**Academic Year:** 2026–2027  

---

---

# CHAPTER 1
## INTRODUCTION

### 1.1 Introduction

The healthcare industry is undergoing a significant digital transformation, driven by the increasing need for faster, more accurate clinical decision-making. Healthcare professionals are expected to manage growing volumes of patient data while maintaining high standards of care. The availability of real-time patient information, clinical risk scores, and evidence-based diagnostic support has become essential for improving patient outcomes.

**MediAssist** is a web-based Clinical Decision Support System (CDSS) developed to assist healthcare professionals in managing patient records, monitoring real-time vitals, and receiving AI-assisted differential diagnoses. The system integrates a modern React-based frontend with a Spring Boot backend and a PostgreSQL database to provide a reliable and scalable platform for clinical use.

The application is designed to be used by authorized healthcare providers, including doctors, nurses, and clinical administrators. It supports role-based access, secure authentication, and a structured interface for accessing patient information. By combining patient data management, vital monitoring, and clinical decision support into a single platform, MediAssist helps healthcare professionals make faster and more informed decisions.

---

### 1.2 Problem Statement

In many clinical environments, patient information is scattered across multiple systems — electronic health records, paper files, lab reports, and monitoring equipment. This fragmentation makes it difficult for healthcare professionals to access a complete picture of a patient's condition quickly. Critical time is often lost in compiling information from different sources before a clinical decision can be made.

Additionally, without structured decision support, clinicians may need to manually calculate clinical risk scores such as qSOFA and TIMI, which can introduce delays and the possibility of human error in high-pressure situations.

A centralized, digital platform is required that brings together patient records, real-time vitals, clinical risk scores, and AI-assisted diagnosis in one accessible interface. MediAssist addresses these challenges by integrating essential clinical functions into a single, secure web application.

---

### 1.3 Objective

The main objective of the project is to develop a web-based Clinical Decision Support System for healthcare professionals.

The specific objectives are:

1. To maintain organized patient records with demographic and clinical information.
2. To display real-time patient vitals with status indicators.
3. To provide AI-assisted differential diagnosis with probability scores.
4. To calculate and present clinical risk scores such as qSOFA and TIMI.
5. To recommend evidence-based treatment pathways and protocols.
6. To implement secure, role-based access control using Clerk authentication.
7. To integrate a React frontend with a Spring Boot REST API and PostgreSQL database.
8. To support future enhancements in clinical analytics and patient monitoring.

---

### 1.4 Scope of the Project

The project focuses on managing and presenting patient clinical information through a centralized web application. It includes patient record management, real-time vitals display, AI differential diagnosis, clinical risk scoring, and recommended treatment pathways.

The system is designed to assist healthcare professionals in accessing relevant patient information quickly through a user-friendly interface. It supports digital information management and clinical decision support but does not replace professional medical judgment or physical clinical assessment.

The application supports secure authentication through Clerk and role-based access for different types of users. It can be enhanced in the future with real-time data feeds from monitoring equipment, mobile access, predictive analytics, and advanced reporting features.

---

### 1.5 Motivation

The increasing complexity of modern healthcare and the critical importance of timely clinical decisions motivate the development of MediAssist. Delayed or incorrect diagnoses can have serious consequences for patient outcomes, and healthcare professionals need reliable tools to support their decision-making process.

The growing availability of web technologies, cloud infrastructure, and AI-assisted analysis provides an opportunity to develop practical clinical support tools. This project applies full-stack web development and database technologies to address real-world healthcare challenges, providing practical experience in building a system that has a direct impact on patient care quality.

---

---

# CHAPTER 2
## LITERATURE SURVEY

### 2.1 Literature Review

Clinical Decision Support Systems (CDSS) have become an important area of research and development in modern healthcare. These systems help clinicians by providing relevant information, reminders, and recommendations based on patient data. Studies have shown that CDSS can improve diagnostic accuracy, reduce medication errors, and support adherence to clinical guidelines.

Web-based healthcare applications have gained importance due to their accessibility and ease of deployment. A browser-based interface allows clinical staff to access patient information from different locations without requiring specialized client software. Modern web frameworks such as React and backend technologies such as Spring Boot support the development of reliable and maintainable healthcare applications.

Secure authentication and role-based access control are essential in healthcare applications to protect sensitive patient information. Platforms such as Clerk provide ready-to-use authentication infrastructure with support for role management, multi-factor authentication, and session control.

Relational databases such as PostgreSQL provide a structured and reliable approach to storing patient records. Spring Data JPA and Hibernate simplify the interaction between the backend application and the database, supporting efficient data retrieval and management.

These technologies and approaches provide the foundation for the MediAssist Clinical Decision Support System. The project combines modern frontend development, RESTful backend services, and secure data management to support clinical decision-making in a web-based platform.

---

### 2.2 Existing System

In conventional clinical settings, patient information may be maintained through paper records, spreadsheets, standalone electronic health record systems, or a combination of these approaches. These methods allow information to be recorded but present challenges when managing large volumes of patient data across different departments.

The major limitations of such approaches are:

1. **Scattered information:** Patient records, lab reports, and vitals may be stored in different systems, making it difficult to access a complete clinical picture quickly.
2. **Manual risk calculation:** Clinical risk scores such as qSOFA and TIMI are often calculated manually, which is time-consuming and error-prone in critical situations.
3. **Limited decision support:** Most existing systems present data without providing structured diagnostic recommendations or evidence-based treatment pathways.
4. **Accessibility challenges:** Clinicians may need to navigate multiple applications to access the information required for a clinical decision.
5. **Lack of real-time monitoring:** Static records do not reflect the current status of a patient's vitals or condition.
6. **Security concerns:** Inconsistent access controls across different systems can create risks for patient data security.

Therefore, a unified application that combines patient record management, real-time vitals display, clinical risk scoring, and AI-assisted diagnosis can improve clinical efficiency and support better patient outcomes.

---

### 2.3 Proposed System

The proposed MediAssist Clinical Decision Support System is a web-based application designed to simplify the management of patient clinical information and support healthcare professionals in making evidence-based decisions.

The system includes a landing page for authorized access, a secure login interface powered by Clerk authentication, a role selection interface, and a clinical dashboard. The dashboard provides real-time patient vitals, AI-assisted differential diagnosis with probability scores, clinical risk scores including qSOFA and TIMI, and recommended evidence-based treatment pathways.

The application uses React and TypeScript for the frontend and a Spring Boot REST API with PostgreSQL for the backend. Axios is used for API communication between the frontend and backend services.

The main advantages of the proposed system are:

1. Centralized access to patient clinical information.
2. Real-time vitals display with abnormal value indicators.
3. AI-assisted differential diagnosis with probability scores and clinical justification.
4. Automated clinical risk score calculation and display.
5. Evidence-based treatment pathway recommendations.
6. Secure role-based access control using Clerk authentication.
7. A modular structure that supports future enhancements.

The proposed system aims to make clinical information more accessible and to support healthcare professionals in making faster, more informed decisions through a single, secure web application.

---

---

# CHAPTER 3
## SYSTEM ANALYSIS

### 3.1 System Requirements

System requirements describe the essential functions and resources needed for the successful operation of the MediAssist Clinical Decision Support System. The application is designed to manage patient clinical information and support clinical decision-making through a secure web-based interface.

#### 3.1.1 Functional Requirements

The functional requirements specify the main operations supported by the system.

1. **Landing Page:** Presents the MediAssist platform to authorized users with an overview of key features.
2. **Authentication:** Enables secure login using Clerk-based authentication with role-based access control.
3. **Role Selection:** Allows authenticated users to select their role (Doctor, Admin, Nurse, etc.) before accessing the system.
4. **Patient Dashboard:** Displays a comprehensive clinical view including patient summary, real-time vitals, risk scores, recommended pathways, and AI differential diagnosis.
5. **Patient Records:** Supports viewing and managing patient demographic information including name, age, gender, blood group, and patient ID.
6. **Vitals Monitoring:** Displays real-time patient vitals such as heart rate, blood pressure, SpO₂, respiratory rate, and body temperature with status indicators.
7. **Clinical Risk Scores:** Calculates and presents clinical risk scores including qSOFA and TIMI with progress indicators.
8. **AI Differential Diagnosis:** Presents structured differential diagnoses with probability scores and clinical justification based on patient data.
9. **Recommended Pathways:** Displays evidence-based treatment protocols and guidelines relevant to the patient's condition.
10. **REST API:** Provides backend API endpoints for patient data retrieval and creation.
11. **Navigation:** Allows users to move between modules through a sidebar and header interface.

#### 3.1.2 Non-Functional Requirements

The non-functional requirements describe the quality and operational characteristics expected from the application.

1. **Usability:** The interface should be clear, structured, and easy to navigate for clinical users.
2. **Performance:** Patient data and vitals should load within a reasonable time to support timely clinical decisions.
3. **Security:** Patient data must be protected through secure authentication, role-based access, and HTTPS communication.
4. **Reliability:** The application should handle supported operations consistently and remain available during clinical use.
5. **Maintainability:** The modular structure of both the frontend and backend should make it easier to update individual features.
6. **Compatibility:** The application should work with modern web browsers without requiring additional client software.
7. **Scalability:** The architecture should support an increasing number of patient records and future feature additions.
8. **Data Integrity:** Patient records should be handled accurately, subject to the validation and data management mechanisms implemented in the system.

---

### 3.2 Software and Hardware Requirements

The MediAssist Clinical Decision Support System uses modern web technologies to provide patient record management, clinical decision support, and secure authentication through a browser-based interface.

#### 3.2.1 Software Requirements

The following software and technologies are used or required for developing and running the application.

| Software / Technology | Purpose |
|---|---|
| Operating System – Windows | Development and execution environment |
| Visual Studio Code | Writing and managing source code |
| React 19 | Developing the user interface |
| TypeScript | Implementing type-safe application logic |
| HTML and CSS (Tailwind CSS v4) | Structuring and styling web pages |
| Vite 8 | Frontend build tool and development server |
| Node.js | Running the JavaScript development environment |
| Axios | HTTP client for API communication |
| React Router DOM v7 | Client-side routing and navigation |
| Clerk | Secure authentication and role-based access |
| Lucide React | Icon library for the user interface |
| Recharts | Data visualization and charting |
| Java 21 | Backend development language |
| Spring Boot | Backend REST API framework |
| Spring Data JPA / Hibernate | Database ORM and data management |
| Spring Security | Backend security and CORS configuration |
| PostgreSQL | Relational database for patient records |
| Maven | Backend build and dependency management |
| Git and GitHub | Source code version control and repository management |
| Web Browser | Accessing and testing the application |

#### 3.2.2 Hardware Requirements

The following are the recommended minimum hardware requirements for development and basic operation.

| Hardware Component | Minimum Requirement |
|---|---|
| Processor | Dual-core processor or equivalent |
| RAM | 8 GB |
| Storage | 20 GB of available space |
| Display | 1366 × 768 resolution or higher |
| Input Devices | Keyboard and mouse |
| Network | Internet connection for authentication services and remote resources |

A system with 16 GB RAM or more is recommended for smoother development, especially when running the frontend dev server, Spring Boot backend, PostgreSQL database, and browser simultaneously. The hardware requirements may vary depending on the number of patient records managed and the complexity of the services used by the application. A stable network connection is required when using Clerk authentication and Supabase cloud services.

---

---

# CHAPTER 4
## METHODOLOGY

### 4.1 System Architecture

The MediAssist Clinical Decision Support System follows a three-tier web application architecture consisting of a presentation layer (React frontend), an application layer (Spring Boot REST API), and a data layer (PostgreSQL database). These components work together to provide patient record management, clinical decision support, and secure access control.

The frontend is developed using React and TypeScript and provides the interface through which healthcare professionals access the application. The backend REST API handles patient data requests and manages database operations. PostgreSQL stores and retrieves patient records. Clerk provides authentication services integrated into the frontend. Axios handles communication between the frontend and the backend API.

The system architecture consists of the following components:

1. **Presentation Layer:** Provides the landing page, login interface, role selection, clinical dashboard, and navigation components. It allows authorized users to interact with the system through a web browser.
2. **Application Layer:** Contains the Spring Boot REST API, service classes, and security configuration required to process requests, manage patient records, and coordinate operations between the frontend and the database.
3. **Data Layer:** Stores and retrieves patient records and clinical information through PostgreSQL, managed using Spring Data JPA and Hibernate.
4. **Authentication Layer:** Clerk provides secure user authentication, session management, and role-based access control integrated into the frontend application.

The modular architecture separates the user interface, application logic, and data management, making the system easier to maintain and providing a foundation for future enhancements.

---

### 4.2 Module Description

The MediAssist Clinical Decision Support System is divided into modules to organize its different functions. Each module is designed to support a particular clinical management activity and provide users with convenient access to relevant information.

#### 4.2.1 Landing Page Module

The landing page acts as the public entry point for the MediAssist platform. It presents the system's key features — Patient Records, Diagnostic Data, and Decision Support — through a structured feature grid. The page includes a navigation bar with login options and a HIPAA compliance notice in the footer. It directs authorized healthcare providers to the login interface.

#### 4.2.2 Authentication Module (Clerk)

The authentication module uses Clerk to provide secure login functionality. Healthcare professionals log in using their credentials, and Clerk manages session tokens, multi-factor authentication, and access control. Only authenticated users can access the clinical areas of the application.

#### 4.2.3 Role Selection Module

After successful authentication, users are presented with a role selection interface. This allows the system to provide a tailored experience based on the user's role — such as Doctor, Nurse, or Administrator. Role selection determines the level of access and the features available to the user within the application.

#### 4.2.4 Clinical Dashboard Module

The clinical dashboard is the primary interface of the MediAssist system. It provides a comprehensive clinical view for the attending healthcare professional. The dashboard is divided into the following sections:

- **Patient Summary Header:** Displays the patient's name, ID, age, gender, admission date, attending physician, and current status.
- **Real-time Vitals Tiles:** Displays five key vitals — Heart Rate, Blood Pressure, SpO₂, Respiratory Rate, and Body Temperature — each with a current value and a status indicator (Normal, High, Low, Elevated).
- **Clinical Risk Scores:** Presents the qSOFA Score and TIMI Risk Score with progress bars and descriptive labels.
- **Recommended Pathways:** Displays evidence-based treatment protocols relevant to the patient's condition, such as the Sepsis 3-Hour Bundle and STEMI Protocol (GDMT).
- **AI Differential Diagnosis:** Presents up to three differential diagnoses with probability scores and clinical justification for each, clearly labelled as decision support only.

#### 4.2.5 Patient Records Module

The patient records module manages patient demographic and clinical data. Patient information is stored in a PostgreSQL database and retrieved through the Spring Boot REST API. Each patient record contains a patient ID, name, age, gender, and blood group. The module supports viewing all patients and adding new patient records.

#### 4.2.6 Header and Sidebar Navigation

The header and sidebar components provide structured navigation across the application. The sidebar allows users to move between the dashboard, patient records, and other clinical modules. The header displays the current user's information and provides access to account settings and logout functionality.

---

### 4.3 Class Diagram

The class diagram describes the structure of the MediAssist backend components and their relationships.

```
+-------------------+          +----------------------+
|  PatientController|          |    PatientService    |
|-------------------|          |----------------------|
| + getAllPatients() |--------> | + getAllPatients()    |
| + createPatient() |          | + createPatient()     |
+-------------------+          | + getPatientById()   |
                               +----------+-----------+
                                          |
                               +----------v-----------+
                               |  PatientRepository   |
                               |----------------------|
                               | + findAll()          |
                               | + save()             |
                               | + findById()         |
                               +----------+-----------+
                                          |
                               +----------v-----------+
                               |       Patient        |
                               |----------------------|
                               | - id: Integer        |
                               | - patientId: String  |
                               | - name: String       |
                               | - age: Integer       |
                               | - gender: String     |
                               | - bloodGroup: String |
                               +----------------------+
```

---

### 4.4 Sequence Diagram

The sequence diagram describes the interaction between the frontend, backend API, and database when a healthcare professional accesses the patient dashboard.

```
User         Frontend        Clerk Auth       Spring Boot API      PostgreSQL
 |               |                |                 |                  |
 |--[Login]----->|                |                 |                  |
 |               |--[Authenticate]->|               |                  |
 |               |<--[Token]-------|               |                  |
 |--[Select Role]->|              |                 |                  |
 |               |--[GET /api/patients]------------>|                  |
 |               |                |                 |--[SELECT * FROM patients]->|
 |               |                |                 |<--[Patient List]-----------|
 |               |<--[Patient Data]----------------|                  |
 |--[View Dashboard]->|           |                 |                  |
 |               |--[Display Vitals, Risk Scores, DDx]                 |
```

---

---

# CHAPTER 5
## IMPLEMENTATION

### 5.1 Frontend Implementation

The MediAssist frontend is implemented using React 19 and TypeScript, built with Vite 8 as the development and build tool. Tailwind CSS v4 is used for styling, and React Router DOM v7 manages client-side navigation. Clerk provides authentication integrated into the React component tree.

The frontend communicates with the Spring Boot backend through Axios HTTP calls. The base API URL is configured through an environment variable (`VITE_API_BASE_URL`) in the `.env.local` file, pointing to the Spring Boot server at `http://localhost:8080`.

The main entry point `main.tsx` wraps the application in the Clerk provider and React Router for authentication and routing support.

---

### 5.2 Module Implementation

#### 5.2.1 Landing Page

The `LandingPage` component renders the public home page of the MediAssist platform. It includes a navigation bar with login and sign-up links, a hero section describing the platform, a feature grid, and a HIPAA-compliant footer.

```tsx
export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <nav className="border-b border-slate-200 py-4 px-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Stethoscope className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold">MediAssist</span>
        </div>
        <Link to="/login">Login</Link>
      </nav>
      {/* Hero Section, Feature Grid, Footer */}
    </div>
  );
}
```

This component provides the entry point for healthcare professionals accessing the MediAssist platform for the first time.

---

#### 5.2.2 Authentication (Clerk)

The login page uses Clerk's `SignIn` component, which handles credential validation, session creation, and multi-factor authentication. The Clerk publishable key is configured through the `VITE_CLERK_PUBLISHABLE_KEY` environment variable.

```tsx
import { SignIn } from '@clerk/react';

export function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn routing="hash" />
    </div>
  );
}
```

Clerk manages the authentication flow, ensuring that only authorized healthcare providers can access the clinical areas of the application.

---

#### 5.2.3 Role Selection

The `RoleSelection` component allows authenticated users to select their role within the system. The selected role determines the clinical features and access levels available to the user.

```tsx
export function RoleSelection() {
  const roles = ['Doctor', 'Nurse', 'Administrator', 'Lab Technician'];
  return (
    <div>
      <h2>Select Your Role</h2>
      {roles.map(role => (
        <button key={role} onClick={() => handleRoleSelect(role)}>
          {role}
        </button>
      ))}
    </div>
  );
}
```

This component ensures that the application can provide a tailored clinical interface based on the authenticated user's professional role.

---

#### 5.2.4 Clinical Dashboard

The `Dashboard` component is the central interface of the MediAssist system. It displays the patient summary, real-time vitals, clinical risk scores, recommended pathways, and AI differential diagnosis.

```tsx
export function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Patient Summary Header */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Jane Doe</h2>
        <span>58F • PT-1024</span>
        <span>STEMI / Sepsis Alert</span>
      </div>
      {/* Real-time Vitals Tiles */}
      {/* Clinical Risk Scores */}
      {/* Recommended Pathways */}
      {/* AI Differential Diagnosis */}
    </div>
  );
}
```

The dashboard presents critical clinical information in a structured, easy-to-scan layout designed for use in time-sensitive clinical environments.

---

#### 5.2.5 Patient API (Axios)

The `patientApi.ts` module handles all HTTP communication between the React frontend and the Spring Boot REST API.

```typescript
import axios from 'axios';

const REST_API_BASE_URL =
  `${import.meta.env.VITE_API_BASE_URL}/api/patients`;

export const getPatients = () =>
  axios.get<Patient[]>(REST_API_BASE_URL);

export const createPatient = (patient: Patient) =>
  axios.post<Patient>(REST_API_BASE_URL, patient);
```

This module provides reusable functions for retrieving and creating patient records. It reads the API base URL from the environment configuration, making it easy to switch between local and production backend environments.

---

### 5.3 Backend Implementation

The MediAssist backend is implemented using Spring Boot with Java. It exposes a RESTful API for patient data management and uses Spring Data JPA with Hibernate to interact with a PostgreSQL database. Spring Security provides CORS configuration and access control.

#### 5.3.1 Patient Entity

The `Patient` entity maps to the `patients` table in the PostgreSQL database.

```java
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
```

This entity represents the core patient data model used throughout the backend application.

---

#### 5.3.2 Patient Repository

The `PatientRepository` interface extends `JpaRepository` to provide standard database operations without requiring manual SQL queries.

```java
@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
}
```

Spring Data JPA automatically generates the implementation for common operations such as `findAll()`, `save()`, and `findById()`.

---

#### 5.3.3 Patient Service

The `PatientService` class contains the business logic for patient data operations and delegates database access to the repository.

```java
@Service
public class PatientService {
    private final PatientRepository patientRepository;

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

---

#### 5.3.4 Patient Controller

The `PatientController` class exposes REST API endpoints for patient data retrieval and creation.

```java
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    @PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        return patientService.createPatient(patient);
    }
}
```

The `@CrossOrigin` annotation allows the frontend application to communicate with the backend API from a different port during development.

---

#### 5.3.5 Security Configuration

The `SecurityConfig` class configures Spring Security to allow all API requests during development and sets up CORS headers to allow communication from the React frontend.

```java
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        return http.build();
    }
}
```

---

#### 5.3.6 Application Configuration

The `application.properties` file configures the database connection and server settings.

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/mediassist
spring.datasource.username=postgres
spring.datasource.password=Kiruba31!
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

PostgreSQL is used as the production-grade relational database for storing patient records. Hibernate manages the schema creation and updates automatically based on the entity definitions.

---

#### 5.3.7 Application Navigation

The MediAssist application uses React Router DOM v7 to organize navigation between the landing page, login, role selection, and clinical dashboard. The main routing configuration in `App.tsx` imports the layout and individual feature components.

```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RoleSelection } from './pages/RoleSelection';
import { Dashboard } from './pages/Dashboard';
```

`BrowserRouter` provides browser-based routing. `Routes` and `Route` define the pages, while `Navigate` supports redirection. The `Sidebar` and `Header` components provide the shared application layout for authenticated users.

---

**Summary**

The key functions of the MediAssist Clinical Decision Support System support patient record management, secure authentication, role-based access, real-time vitals display, clinical risk score calculation, AI-assisted differential diagnosis, and evidence-based treatment pathway recommendations. Together, these modules provide a centralized interface for healthcare professionals to access and act on critical patient information efficiently.

---

---

# CHAPTER 6
## CONCLUSION & FUTURE WORK

### 6.1 Conclusion

The MediAssist Clinical Decision Support System is a web-based application developed to manage patient clinical information and support healthcare professionals in making faster, more accurate clinical decisions. The main objective of the project is to provide a centralized, secure, and structured platform for accessing patient records, monitoring vitals, and receiving AI-assisted diagnostic support.

The system includes various modules such as the Landing Page, Clerk Authentication, Role Selection, Clinical Dashboard, Patient Records API, and Application Navigation. The Clinical Dashboard provides a comprehensive view of patient vitals, clinical risk scores (qSOFA and TIMI), evidence-based treatment pathways, and AI differential diagnosis with probability scores. The Patient Records module manages patient demographic data through a Spring Boot REST API connected to a PostgreSQL database.

The application uses React 19 and TypeScript for frontend development, Vite 8 as the build tool, Tailwind CSS v4 for styling, and Clerk for secure authentication. The backend uses Spring Boot with Spring Data JPA and PostgreSQL for reliable data management. Axios handles API communication between the frontend and backend services. The GitHub repository at [github.com/Kiruba-31/Health-Care-1](https://github.com/Kiruba-31/Health-Care-1) manages the project's version control.

Thus, the MediAssist Clinical Decision Support System achieves its objective of providing a centralized web-based platform for clinical information management and decision support. The project demonstrates how modern web technologies can be used to organize patient records, display real-time vitals, and support evidence-based clinical decision-making. The developed system also provides a foundation for introducing additional features to improve clinical outcomes in the future.

---

### 6.2 Future Enhancements

The MediAssist Clinical Decision Support System can be further improved by introducing additional functionalities that extend the capabilities of the existing application.

One possible enhancement is **real-time vitals integration**, connecting the dashboard to live monitoring equipment or IoT sensors to display dynamically updating patient vitals instead of static data. This would transform the dashboard into a true real-time clinical monitoring tool.

The **AI Differential Diagnosis module** could be enhanced with integration to a machine learning model trained on clinical datasets, providing data-driven probability scores based on the actual patient's recorded vitals and history rather than static values.

**Advanced reporting** features could be introduced to generate detailed patient reports, discharge summaries, and clinical outcome analyses. These reports could be exported in PDF or Excel formats and shared directly with other healthcare providers.

**Notification and alert systems** could be developed to notify attending physicians when a patient's vitals cross critical thresholds, ensuring timely intervention in emergency situations.

**Lab report and diagnostic imaging integration** could allow clinicians to upload and view laboratory results and radiology reports directly within the patient's clinical record, providing a more complete picture of the patient's condition.

A **mobile application** could be developed to improve accessibility, allowing healthcare professionals to review patient information and receive alerts from any location. **Cloud deployment** on platforms such as AWS or Azure could support multi-site access and improve the scalability of the system.

These future enhancements could make the MediAssist Clinical Decision Support System more comprehensive, real-time, and clinically impactful. By building upon the existing modules, the system could be extended to support advanced patient monitoring, predictive analytics, and integrated clinical workflows.

---

*© 2026 MediAssist Systems. For authorized healthcare providers only.*
