<h1>**Certificate App - React Frontend Implementation**</h1>

Welcome to the Certificate App project.

The Certificate App exemplifies my commitment to learning and adapting to new technologies, as I tackled React for the first time.

<h2>About the Project: </h2>
This project represents a completely new experience and a fresh challenge for me. I made the decision to take on the challenge and learn a new programming language. Before diving into the project, I devoted several days to researching and learning React, as this was my first time working with it. Regarding the implementation, I endeavored to give my best effort to make it both aesthetically pleasing and highly functional, covering as much of the requirementsas as possible. However, due to the time "lost" in the learning process, I was unable to implement the language translation feature, even though I would have liked to complete that part as well.

As you review the project, I believe you will notice variations in the writing style across the files. This is because, as I conducted research and gained experience, I discovered simpler ways to implement certain features, such as importing different libraries and components. I also imported CSS in various ways, including through separate .css files, inline styles, within the files themselves, or by using "import styled from 'styled-components';".

![Screenshot from 2023-10-09 23-00-53](https://github.com/ivana47/Certificate-App/assets/89736924/32620671-3d97-4358-871e-0d1bdf9b3280)
![Screenshot from 2023-10-09 23-01-17](https://github.com/ivana47/Certificate-App/assets/89736924/5ff195f7-6823-4728-a890-0a1b34178859)
![Screenshot from 2023-10-09 23-00-40](https://github.com/ivana47/Certificate-App/assets/89736924/982a8732-f41a-47c0-a245-5e83cf98df73)

<h2>About the Application:</h2>

Inside the "components" folder, you will find:

SidebarData.js (contains data for the sidebar with icons).
SubMenu (as the name suggests).
Sidebar (implements the appearance of the sidebar, header, user selection, which is stored in local storage, and provides space for the implementation of language support).
CertificateItem (defines the appearance of the first table and handles editing and deleting individual rows).

Within the "pages" folder:

MachineL (from which we actually call "Example1" or "Overview.js," serving as the "main" file with the majority of the content).
In the "Overview.js" file, we import "CertificateItem" and include the "PersonDialog" for adding new individuals, which are hardcoded and imported from "/data/PersonTable."
"NewCertificate" opens the screen for adding new certificates, which are stored in local storage using functions from the "services" folder in the "localstorage.js" file.
Additionally, there is the "SuppliersDialog," where we add desired suppliers from "data/SupplierTable," which creates a table and populates it with hardcoded data.

Overview:
![Screenshot from 2023-10-09 23-11-48](https://github.com/ivana47/Certificate-App/assets/89736924/4b6e738e-1fa3-40e1-a6cc-7397b47d1dec)
![Screenshot from 2023-10-09 23-25-36](https://github.com/ivana47/Certificate-App/assets/89736924/f0506337-aee1-43d6-ba41-d33e0f58502c)
![Screenshot from 2023-10-09 23-11-40](https://github.com/ivana47/Certificate-App/assets/89736924/ae41da86-bdde-4b80-90ca-5b06ded03a37)
![Screenshot from 2023-10-09 23-11-22](https://github.com/ivana47/Certificate-App/assets/89736924/3543d883-7da7-499d-a8c1-5d4df095b9c5)


<h3> Thank you for taking the time to review my project. </h3>

