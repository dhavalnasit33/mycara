Pages:

label,

description,

path,

parentId,

type\['link', 'dropdown'],

order,

isVisible

slug



Sections:

type

title

subtitle

short description

long description

backgroundImage

order

isVisible

slug

button\_name

button\_link



Categorys

Name

description

parentId

isVisible

image

isnewArrival



colour:

name,



size:

name



products:

name

shortDescription

longDescription

category\_id

discount

showIcons

icons:\[]

color\_ids:\[],

productImages

rating:

price

size\_ids

isVisible

isfeturedproduct

istradingproducts

bestproducts

recoomandproducts



Wishlist:

user\_id,

product\_id,

createdAt





CartItem

user\_id

product\_id

quantity

selectedColor

selectedSize

addedAt



users:

name

email

password

isAdmin

createdAt

line1,

line2,

city,

state,

country,

postalCode



orders

user\_id

products{product\_id,quantity,selectedColor,selectedSize,price}

totalPrice,

status,

createdAt



settings:

button colour

backround colour

text colour

icon colour

logo



brands

type

febric

discount

productlable

















Settings Table:

site\_name

logo\_url

primary\_color

secondary\_color

button\_color

footer\_text

meta\_title

meta\_description
created\_at

updated\_at



Sections Table

\_id

title

description

image\_url

background\_image\_url

order

is\_button

button\_name

button\_link

created\_at

updated\_at



Navbar Table

id

label

url

order

created\_at

updated\_at



Footer Table

id

label

url

created\_at

updated\_at



Brands Table

id

name

logo\_url

created\_at

updated\_at





Types Table

id

name

created\_at

updated\_at



Fabrics Table

id

name

description

created\_at

updated\_at



ProductLabels Table

id

name

color

created\_at

updated\_at





Discounts Table

id

name

type

value

start\_date

end\_date

is\_active

created\_at

updated\_at



Categories Table

id

name

slug

image\_url

parent\_id

created\_at

updated\_at



Products Table

id

category\_id

brand\_id

type\_id

fabric\_id

name

description

price

discount\_id

labels

images

slug

is\_featured

is\_best\_seller

is\_trending

created\_at

updated\_at



ProductVariants Table

id

product\_id

color

size

stock\_quantity

price

sku

created\_at

updated\_at



Users Table

\_id

name

email

password\_hash

role

created\_at

updated\_at



Coupons Table:

\- id

\- code                

\- description         

\- discount\_type       

\- discount\_value      

\- min\_purchase\_amount 

\- max\_discount\_amount 

\- usage\_limit         

\- used\_count          

\- start\_date

\- end\_date

\- is\_active          

\- created\_at

\- updated\_at



Orders Table

\_id

user\_id

total\_price

status

coupon\_id

created\_at

updated\_at



OrderItems Table

id

order\_id

product\_id

variant\_id

quantity

price\_at\_order

created\_at

updated\_at



Payments Table:

\- id

\- order\_id              

\- user\_id               

\- payment\_method        

\- payment\_status        

\- transaction\_id        

\- amount\_paid           

\- discount\_amount       

\- coupon\_id             

\- payment\_date

\- created\_at

\- updated\_at



Cart Table:

\_id

user\_id

created\_at

updated\_at



CartItems Table

id

cart\_id

product\_id

variant\_id

quantity

created\_at

updated\_at



Wishlist Table

\_id

user\_id

created\_at

updated\_at



WishlistItems Table

id

wishlist\_id

product\_id

variant\_id

created\_at

updated\_at



ContactUs Table

\_id

name

email

subject

message

status

created\_at

updated\_at



CustomerReviews Table:

\- id

\- user\_id            

\- product\_id         

\- rating             

\- title              

\- comment            

\- is\_approved        

\- created\_at

\- updated\_at





