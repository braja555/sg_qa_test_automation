# Skyground Test Automation Framework

## Overview
The test automation framework is engineered to deliver a robust, scalable, and comprehensive solution for automating the testing of Skyguard applications. This framework includes a variety of features such as:

1. Page Object Model
2. Reusability utilities
3. Data-driven testing
4. Multiple environments
5. Cross-browser testing
6. Parallel testing
7. Retry mechanism
8. Test Data Generation
8. Logging
9. Code quality
10. CI/CD integration

## Table of Contents
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Automation Framework Objective](#automation-framework-objective)
- [Automated Test Scenarios](#automated-test-scenarios)
- [Setup and Running](#setup-and-running)
- [Future Enhancement](#future-enhancement)

## Project Structure
```
├── node_modules
├── src
│   ├── base
│   │   └── base.ts
│   ├── pages
│   │   └── modules
│   │       ├── home
│   │       ├── login
│   │       └── register
│   ├── resources
│   │   ├── data
│   │   ├── environment
│   │   └── screenshots
│   └── utils
│       ├── ENV.ts
│       ├── GetTestData.ts
│       ├── GlobalEnvSetup.ts
│       └── LoggerUtil.ts
├── test-results
├── tests
│   ├── home.spec.ts
│   ├── login.spec.ts
│   └── register.spec.ts
├── logfile.log
├── Dockerfile
├── README.md
├── playwright.config.ts
└── tsconfig.json
```

## Technology Stack
- **Automation Tool:** Playwright
- **Programming Language:** TypeScript

### Why Playwright and TypeScript?
### Playwright
- **Cross-Browser Support:** Playwright offers robust support for testing across different browsers, ensuring comprehensive test coverage.
- **Reliability:** Playwright is known for its reliability in handling complex interactions and scenarios, making it ideal for robust test automation.
- **Speed:** With Playwright's ability to run tests in parallel, test execution times can be significantly reduced, improving overall efficiency.
- **Community Support:** Playwright has a strong community that actively contributes to its development, ensuring timely updates and support.

### TypeScript
- **Static Typing:** TypeScript's static typing helps catch errors during development, improving code quality and reducing bugs in the automation framework.
- **Maintainability:** TypeScript's readability and maintainability make it easier for team members to collaborate and understand the codebase.
- **Modern Features:** TypeScript supports modern JavaScript features, enabling the use of the latest language capabilities to write cleaner and more efficient code.
- **Tooling Ecosystem:** TypeScript's rich tooling ecosystem provides features like code completion, refactoring, and error checking, enhancing developer productivity.

## Automation Framework Objective
Certainly! Here are concise descriptions for each concept in the context of an automation framework using Playwright and TypeScript:

1. **Page Object Model**: 
   "Encapsulates web page elements and interactions within classes for modularity and maintainability."

2. **Reusability utilities**: 
   "Provides reusable functions and helpers to streamline common test actions and assertions."

3. **Data-driven testing**: 
   "Implements data-driven testing by utilizing JSON files to input multiple data sets for comprehensive test coverage."

4. **Multiple environments**: 
   "Supports testing across multiple environments by configuring environment-specific settings and variables."

5. **Cross-browser testing**: 
   "Ensures compatibility by running tests across various browsers such as Chromium, Firefox, and WebKit using Playwright."

6. **Parallel testing**: 
   "Enhances efficiency by executing multiple tests concurrently using Playwright's parallel execution capabilities."

7. **Retry mechanism**: 
   "Incorporates a retry mechanism to automatically re-run failed tests, mitigating flakiness and improving reliability."

8. **Test Data Generation**: 
    "Utilize Node.js crypto module's createHash function for secure and efficient test data generation."

8. **Logging**: 
   "Implements structured logging to capture detailed information about test execution and failures."

9. **Code quality**: 
   "Maintains high code quality through TypeScript's static typing, linting, and adhering to best practices."

10. **CI/CD integration**: 
    "Integrates with CI/CD pipelines to automate test execution and reporting on code changes continuously."

## Setup and Runner
### Pre-Setup
- Install Node.js and npm: Download and install from nodejs.org.
- VS Code Extensions: Install "Playwright Test for VSCode" (Preferred).
- Clone the repo to VS code.
- Install dependencies:
   ```terminal
   npm init playwright@latest
   npm install --save-dev typescript ts-node @types/node
   npm install dotenv --save
   npm install -D allure-commandline
   npm install typescript @types/node @types/winston @types/moment-timezone
   ```
- Test Run Cmd in Local
  ```terminal
   npx playwright test (to execute all tests in tests folder)
   npm run env:test (to execute test script on QA(test) environment)
   npm run env:dev (to execute test script on dev environment: env is not ready)
   npx playwright test --headed (to execute in headed mode)
   npx playwright test --ui (to execute in playwright UI mode)
   npx playwright test --project==firefox (to execute in firefox browser only)
   npx playwright test login.spect.ts (to execute specific test class)
   npm playwright test --debug (to execute in debug mode)
   npx playwright test --ui-port=8080 --ui-host=0.0.0.0 (to execute in ui-port=8080)
   ```

  - To View Allure Report after Test Execution Run Below Cmd
  ```terminal
   npx allure generate ./allure-results --clean  
   npx allure open ./allure-report/  
   ```
   - To View Playwright Report after Test Execution Run Below Cmd
  ```terminal
   npx playwright show-report 
   ```
  - Test Run Cmd in Docker
   ```terminal
   docker pull mcr.microsoft.com/playwright:v1.44.1-jammy
   docker run -it --rm --ipc=host mcr.microsoft.com/playwright:v1.44.1-jammy 
   docker npx playwright test
   ```
### Automated Test Scenarios

1. Detailed manual test cases for Registration, Login, and Home page scenarios have been written to cover maximum possible scenarios. This ensures comprehensive coverage and helps identify candidates for automation. All test cases are documented and available in the shared Google Sheet [here](https://docs.google.com/spreadsheets/d/1_HUti7YAe1BZBDx3jPZ1sY-_CiOd3Slxq3N4oP0K6xs/edit?usp=sharing).

2. A total of 28 test scenarios have been identifi
ed and automated, ensuring robust test coverage for these functionalities.

### Future Enhancement For Large Scale Project
- API/Backend automation
- Hybrid framework (Mobile/Web/API)
- Integrate advanced reporting and analytics tools.
- Enhance CI/CD integration with automated triggers.
- Implement robust test data management and automation.
- Expand cross-browser and cross-device testing capabilities.
- Incorporate security and performance testing tools.
- Develop a user-friendly interface for test management.
- Create comprehensive documentation and provide regular training.


