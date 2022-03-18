# PROJECT IRON WAITER

A program for Restaurants based on socket.io, node, React and Express. To be able to receive orders directly from the tables in real time, validate them and add them to the final account.

deployed: https://waiterhack.netlify.app/ 

## Express endpoint table

| HTTP Method | URI path | Description | JSON |
| Client Routes | | | |
|------------- |--------------- |------------------------------------------------ |--------- |
| GET | `/` | Landing sign-in Form | |
| GET | `/restaurante/registro` | New Restaurant regisrer Form | |
| GET | `/restaurante/:id` | Restarurant profile | |
| GET | `/restaurante/:id/panel` | Working-day Panel | |
| GET | `/restaurante/:id/panel/resumen` | Working-day Totals Resume | |
| GET | `/restaurante/:id/panel/:tableid` | Table detail | |
| GET | `/restaurante/:id/panel/:tableid/qr` | Table QR print| |
| GET | `/restaurante/:id/menu` | Menu Edition | |
| POST | `/restaurante/:id/menu` | Menu Edition POST | |
| GET | `/restaurante/:id/edicion-mesas` | Menu Table Edition | |
| GET | `/restaurante/:id/:tableid/customer-login` | Password generate session login| |
| GET | `/restaurante/:id/:tableid/customer-order` | Menu Customer Form QR LANDING| |
| POST | `/restaurante/:id/:tableid/customer-order` | Menu Customer Form | |
| GET | `/restaurante/:id/:tableid/check-out` | Pre final Paid view | |
| Server Routes | | | |
| | | |
| POST | `/api/create` | New Restaurant regisrer |✓ |
| GET | `/api/restaurant/:id` | Get one Restaurant | ✓|
| POST | `/api/create-product` | Create product | ✓|
| DELETE | `/api/delete-product` | Delete product | ✓|
| POST | `/api/create-table` | Table Create |✓ |
| POST | `/api/send-order` | Create order |✓ |
| PUT | `/api/edit-order` | Edit order |✓ |
| POST | `/api/accept-order` | Accept order |✓ |
| POST | `/api/delete-order` | Delete order |✓ |
| DELETE | `/api/delete-total` | Delete total |✓ |
| PUT | `/api/update-total` | Update total |✓ |
| POST | `/api/auth/loginRestaurant` | Restaurant Log-in |✓ |
| POST | `/api/auth/loginTable` | Table Log-in |✓ |

## NEXT STEPS ##

Deploy whith socket.io (only working on local).
Delete tables and products.
Improve UI.
Add restaurat sell stats.
Add bulb advisor with IOT.
