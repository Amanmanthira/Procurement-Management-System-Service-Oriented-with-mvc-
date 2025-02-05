# Procurement Management System for TechFix
## Developed with Mern Stack using Service-Oriented Architecture (SOC)

Welcome to the **Procurement Management System for TechFix**! This system is designed to streamline procurement processes, making it easy to manage suppliers, quotations, and users efficiently. It is built using the **MERN Stack** and follows a **Model-View-Controller-Service (MVC-S)** architecture, which combines traditional MVC design patterns with **Service-Oriented Computing (SOC)** principles.

---

## 🚀 Features

- **🖥️ Supplier Dashboard**: Manage products and track quotations.
- **🔧 Admin Dashboard**: Oversee supplier activity and user management.
- **📝 Quotations**: Create, send, accept, and manage quotations seamlessly.
- **📦 Product Management**: Add, edit, and delete product details.
- **👤 User Management**: Admins can manage user roles and access.
- **💡 Printable Receipts**: Generate and download modern quotation receipts.

---

## 📚 Table of Contents

- [User Roles and Actions](#user-roles-and-actions)
- [System Workflow](#system-workflow)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)
- [Contact](#contact)

---

## 👥 User Roles and Actions

### 🛒 **Supplier Role**
| **Action**                      | **Description**                                    |
|----------------------------------|----------------------------------------------------|
| 📊 View Supplier Dashboard       | Access an overview of their products and quotations. |
| ➕ Add Products                   | Add new items to their inventory.                  |
| ✏️ Edit/Delete Products          | Update or remove existing product details.         |
| 📬 View Quotations from Admin    | Review quotations sent by the admin.               |
| ✅ Accept Quotations              | Approve quotations they agree with.                |
| 📈 View Accepted Quotations      | Track all accepted quotations.                     |
| 🖨️ Print Quotation Receipt       | Generate printable receipts for quotations.        |

---

### 🛠️ **Admin Role**
| **Action**                      | **Description**                                    |
|----------------------------------|----------------------------------------------------|
| 🖥️ View Admin Dashboard         | Monitor overall system activity.                   |
| ➕ Add New Users                 | Create new supplier or admin accounts.             |
| 🗑️ Manage Users                 | Edit or delete user accounts.                     |
| 🛒 View Supplier Products        | Inspect products listed by suppliers.              |
| 🔍 Search Products               | Search for specific items across suppliers.        |
| 📧 Send Quotations to Suppliers  | Generate and send quotation requests.              |
| 📦 View Sent Quotations          | Track quotations sent to suppliers.                |
| ✅ View Accepted Quotations      | Monitor accepted quotations.                       |
| 🖨️ Print Quotation Receipt      | Generate printable receipts for quotations.        |

---

## 🧩 System Workflow

- **👨‍💼 Admin Actions**: Admins create and manage quotations, users, and products in the system.
- **🛒 Supplier Actions**: Suppliers respond to quotations, manage their inventory, and track their accepted quotations.
- **📑 Quotation Flow**: Quotations are initiated by admins and responded to by suppliers, ensuring efficient communication and documentation.
- **🖨️ Receipt Generation**: Both suppliers and admins can generate modern, downloadable receipts for their records.

---

## 🧩 System Architecture

The system follows a **Model-View-Controller-Service (MVC-S)** architecture, combining the traditional MVC design pattern with **Service-Oriented Computing (SOC)** principles.

- **📂 Model**: Represents the data layer, interacting with the database. Each module (e.g., users, products, quotations) has its own model.
- **🖥️ View**: Represents the user interface (UI), built using React to render and display data.
- **🧠 Controller**: Contains the logic for processing user requests, interacting with models, and returning responses.
- **🔗 Service Layer**: This is where **Service-Oriented Computing (SOC)** comes in. It introduces a separation between business logic and other layers, allowing each component to work independently and communicate via APIs.

---

## 📦 Screenshots

Here’s a sneak peek of the system's user interface:
![login](https://github.com/user-attachments/assets/5594df93-dc2e-4c11-a64a-1446c84f7140)
![Admin Dashboard](https://github.com/user-attachments/assets/d98db182-8aea-497b-8592-7c7cf906bc30)
![Product Management](https://github.com/user-attachments/assets/b679a608-d5b6-4913-8b39-c209d6e2992a)
![Quotation Management](https://github.com/user-attachments/assets/ca65cbc4-1122-4d0f-9a86-37ba535161e1)
![Supplier Dashboard](https://github.com/user-attachments/assets/743ed180-f63c-4b1b-9736-e6ed9291a7f1)
![Generate Receipt](https://github.com/user-attachments/assets/a40bc5ce-d729-46fd-9611-d6eae46bbbcb)
![Quotation Overview](https://github.com/user-attachments/assets/85e8a507-1590-4e6a-816f-b4a07d85d62e)

---

## 🚧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/techfix-procurement-system.git
