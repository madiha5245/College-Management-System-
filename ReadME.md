https://console.neon.tech/app/projects/lucky-art-30456977/branches/br-raspy-feather-axwuap8e/sql-editor?database=neondb






Course is the resource.

Roles are simply different people interacting with that resource.

ONE faculty → MANY courses
That's one-to-many.

This tells you where the foreign key should go.

users                 courses
-----                 -------
id  ───────────────→  faculty_id

The foreign key goes in courses because many courses belong to one faculty.

//

MANY students ↔ MANY courses -That's many-to-many.

Imagine:

courses

id    name       student_id
---------------------------
1     DBMS       3

But now 4 also takes DBMS.

What do you do?

student_id = 3, 4

You can't properly store a list of IDs in a normal foreign-key column.

So you create another table:

enrollments


student_id    course_id
-----------------------
3             1
4             1
3             2
4             3

That third table exists because of the many-to-many relationship.


//so the ownership is rewuired when action persormer does actions adn veiwer performer views 
View all courses	Admin	No
View own attendance	Student	Yes
Update my course	Faculty	Yes
Delete my course	Faculty	Yes








Assumptions:
**For now, /auth/register is only for students. Anyone who uses it gets the student role

**faculty gets his passwort temporarily by admin 

//NEXT
create student adn faculty table
admic creating them 
 Test APIs
      ↓
Enrollment
        ↓
 Attendance

 POST   /courses/create       → Admin
GET    /courses              → Logged-in users
GET    /courses/:id          → Logged-in users
PUT    /courses/:id          → Admin / owner
DELETE /courses/:id          → Admin / owner