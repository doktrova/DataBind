DataBind
========

DataBind is a simple javascript function that facilitates binding Data from a JSON object to a HTML template. The objective of this script is to enable using templates without introducing any new or invalid syntax and without dictating the way you structure your application. All you need is a single function. You can copy and paste it or download the file.

Easy Guide to DataBind

Elements Used in this example:

JSON:

var blog = {

 "Id" : 1,

 "Title": "My Programming Blog",

"Posts": [

{ 

"Id" : 1,

"Text" : "This is my first post in this blog. Stay tunned i will post many more", 

"Comments": [

{ 

"Id": 1,

"Text": "This Blog Is boring"

},

{

"Id": 2,

"Text": "When are you going to post again?"

}

]

}

]

}

Template:

<div id="BlogTemplate" style="visibility: hidden">

<article data-id="Id">

<header data-text="Title"></header>

This blog contains <span data-text="Posts.length"></span> posts.

<section data-repeat="Posts">

<p data-id="Posts.Id" data-text="Posts.text"></p>

There are <span data-text="Posts.Comments.length"></span> comments for this post.

<div data-repeat="Posts.Comments">

<p data-text="Comments.Text"></p>

</div>

</section>

</article>

</div>

HTML Page

<section id="ProgrammingBlog">

</section>

<script>

var template = document.getElementById("BlogTemplate");

document.getElementById("ProgrammingBlog").innerHTML += DataBind(template, blog);

</script>

Result:

My Programming Blog 

This blog contains 1 posts.

This is my first post in this blog. Stay tunned i will post many more

There are 2 comments for this post.


This Blog Is boring

When are you going to post again?

HTML Result:

<article id="1" data-id="Id">

<header data-text="Title">My Programming Blog</header>

This blog contains <span data-text="Posts.length">1</span> posts.

<section data-repeat="Posts"> 

<p id="1" data-id="Posts.Id" data-text="Posts.Text">

This is my first post in this blog. Stay tunned i will post many more

</p>

There are <span data-text="Posts.Comments.length">2</span> comments for this post.

<div data-repeat="Posts.Comments">

<p data-text="Comments.Text">This Blog Is boring</p>

<p data-text="Comments.Text">When are you going to post again?</p>

</div>

</section>

</article>

DataBind Function:

The function takes two arguments HTMLElement containing the template and JSON object.

Function returns Data Bound HTML.

The return HTML can be added to any section of the page.

Building Templates

The template can be inside a hidden HTML are element such as div, section, span, etc. It also cab be in a separate file and imported at runtime using AJAX. The objective of the scrip was to not interfere with your application structure so the way you load the template data and JSON data is totally up to you, the script just binds them together. The elements of the template which need to display data should have an attribute starting (data- ) which is HTML 5 standard.

The syntax is:

data-<attribute you need to import data to> = "Data Key Name from the JSON Object"

ex: data-text="BlogText", data-id="BlogId", data-alt="AvatarDescription", data-src="AvatarUrl", etc

<section data-id="BlogId" data-text="BlogText">

<img data-src="AvatarUrl" data-alt="AvatarDescription" />

</section>

**Every attribute can be set.

Sometimes a JSON object contains an array of elements, other objects or array of other objects. Inheritance is not a problem for DataBind. Please see example to see how inheritance is handled.

