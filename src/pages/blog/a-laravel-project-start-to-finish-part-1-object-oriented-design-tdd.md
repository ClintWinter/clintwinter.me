---
layout: ../../layouts/BlogPostLayout.astro
title: "A Laravel Project Start to Finish: Part 1 - Object-Oriented Design & TDD"
author: Clint Winter
publishedAt: 2019-12-23 18:00:08
createdAt: 2019-12-23 16:58:58
updatedAt: 2022-12-28 11:06:04
---

This is a series of posts I will be writing with the intention to document a project from start to finish using MySQL, Laravel, Vue.js and tailwindcss. I'm talking about taking a project from only an idea to a production website used by people. I am choosing to keep the project in a private repository because I don't really want my proprietary content to be public, and, when looking at similar businesses, they do the same thing. But that doesn't mean I can't document and share as much as I can with you about the process of building it!
And with that I unveil my *Secret Project™*, which is going to be a site I launch with the purpose of teaching through screencasting! I plan on developing courses that contain all different types of resources including screencasts, exercises, projects, comments, documents and external resources, and more! The plan is to be able to give away as much free content as I can get away with because just being able to teach is a great privilege that will teach me even more than I can teach you. I can't share many details just yet because this idea isn't concrete yet and I don't want to commit to any ideas right now. All I know is I need a dedicated site where I can create courses to share with an audience that wants to learn the things that I am knowledgeable enough about to teach.
Now, let's get into the project.
## Setting up the Environment
Now, I don't want to get far into the weeds of setting up an environment for your project because that depends on a lot of different factors, so the best I can do is share with you what I'm working with. Luckily there is an abundance of options with a ton of documentation on how to handle that. 
* **Operating System:** Windows 10\n* **IDE:** [VS Code](https://code.visualstudio.com/)
First, you need [Composer](https://getcomposer.org/) installed and added to your path variable, so it is usable as a command from the command line. With that you can install Laravel so it is usable as a command as well. If you need direction on doing that, you can find that here: [https://laravel.com/docs/6.x](https://laravel.com/docs/6.x). 
You also need to setup MySQL on your machine. I personally use [MAMP](https://www.mamp.info/en/) to handle the database connection and [MySQL Workbench](https://www.mysql.com/products/workbench/) to interact with the database.
## Beginning the Application
Okay, now we can actually get our application up and running. First things first, create a new Laravel application:
```\n$ laravel new <app_name>\n```
### Handling the Database
Whenever I'm working with a new project I like to create a separate user in the database just for interacting with that project for security purposes. Add that information into your `.env` file so you can connect with the database:
```\nDB_CONNECTION=mysql\nDB_HOST=127.0.0.1\nDB_PORT=3306\nDB_DATABASE=testdb\nDB_USERNAME=\"testusername\"\nDB_PASSWORD=\"testpassword\"\n```
> Pro Tip: Use quotations around the username and password because certain characters will break the migration command.
Then run the command below to migrate the tables that come with the project to test that your connection is working as expected. Those migration files are found in `database/migrations/`.
```\n$ php artisan migrate\n```
The next thing you can do is run the below command and go to `http://localhost:8000` to see if your project is being served up.
```\n$ php artisan serve\n```
At this point if you database is hooked up and you can see your project being served in the browser, you are ready to start working on the project. But not so fast! I didn't even start my project until I spent a hefty amount of time just designing what the application should do. 
## Designing the Application
I have a Github repository dedicated to [object-oriented design](https://github.com/ClintWinter/object-oriented-design-course), so if you want to go into more detail on what I've done you can probably find it there. I also recommend the course itself.
I began with getting the idea for the project out on paper. I didn't go super crazy with it, but I wrote out some use cases and user stories so I could collect objects and behaviors and begin to see the bigger picture.
![Imgur](https://i.imgur.com/UmOz2SN.png)
As you can see, I highlighted nouns in blue and behaviors in orange. I also added user stories--as I wrote these, thinking from the user perspective gave me a lot of ideas for more things I would want as a user. I think the exercise was beneficial for really fleshing out the ideas and what was necessary for the application to be successful.
![Imgur](https://i.imgur.com/UyD1xde.png)
I gathered up my objects and their behaviors and listed them out. On paper I connected the objects to each other to see their relationships.
## TDD
Funny, but I haven't actually started writing the actual application yet, or at least anything that can be seen from the browser. I have only started writing tests. 
At this point I have begun writing the models and migrations for the objects that will be in the application. It's a little all over the place, but I started with the things that were easy, such as the relationships between a user, a course, and a lesson.
```PHP\n// app/User.php\nnamespace App;
use Illuminate\Contracts\Auth\MustVerifyEmail;\nuse Illuminate\Foundation\Auth\User as Authenticatable;\nuse Illuminate\Notifications\Notifiable;\nuse App\Course;\nuse App\Lesson;
class User extends Authenticatable\n{\n    use Notifiable;
    /**\n     * The attributes that are mass assignable.\n     *\n     * @var array\n     */\n    protected $fillable = [\n        'name', 'email', 'password',\n    ];
    /**\n     * The attributes that should be hidden for arrays.\n     *\n     * @var array\n     */\n    protected $hidden = [\n        'password', 'remember_token',\n    ];
    /**\n     * The attributes that should be cast to native types.\n     *\n     * @var array\n     */\n    protected $casts = [\n        'email_verified_at' => 'datetime',\n    ];
    public function register(Course $course)\n    {\n        $this->courses()->save($course);\n    }
    public function courses()\n    {\n        return $this->belongsToMany(Course::class);\n    }
    public function completedLessons()\n    {\n        return $this->belongsToMany(Lesson::class, 'completed_lessons', 'user_id', 'lesson_id');\n    }\n}\n```
```PHP\n// tests/Feature/UserTest.php\nnamespace Tests\Feature;
use Illuminate\Foundation\Testing\RefreshDatabase;\nuse Illuminate\Foundation\Testing\WithFaker;\nuse Tests\TestCase;\nuse \App\Course;\nuse \App\User;
class UserTest extends TestCase\n{\n    use RefreshDatabase;
    /** @test */\n    function a_user_can_be_authenticated()\n    {\n        $user = factory(User::class)->create();
        $this->actingAs($user);
        $this->assertAuthenticatedAs($user);\n    }
    /** @test */\n    function a_user_can_register_for_a_course()\n    {\n        $user = factory(User::class)->create();
        $this->actingAs($user);
        $course = factory(Course::class)->create();
        $user->register($course);
        $user->courses;
        $this->assertDatabaseHas('course_user', [\n            'course_id' => $course->id,\n            'user_id' => $user->id,\n        ]);\n    }\n}\n```
I started with this test:
```PHP\n// tests/Feature/UserTest.php\n/** @test */\nfunction a_user_can_be_authenticated()\n{\n    $user = factory(User::class)->create();
    $this->actingAs($user);
    $this->assertAuthenticatedAs($user);\n}\n```\nI think this test passed immediately because the user model and migration was already setup from the start. So the next test was:
```PHP\n/** @test */\nfunction a_user_can_register_for_a_course()\n{\n    $user = factory(User::class)->create();
    $this->actingAs($user);
    $course = factory(Course::class)->create();
    $user->register($course);
    $user->courses;
    $this->assertDatabaseHas('course_user', [\n        'course_id' => $course->id,\n        'user_id' => $user->id,\n    ]);\n}\n```
This failed because I didn't have a `Course` model, a factory for that model, the relationship defined on those models, or a register method for the user. I started with the model:
```\n$ php artisan make:migration create_courses_table -m\n```
This command creates the migration file for creating the `courses` table. The `-m` flag creates the model for it simultaneously. First I defined the columns for my `courses` table in the migration file:
```PHP\nuse Illuminate\Database\Migrations\Migration;\nuse Illuminate\Database\Schema\Blueprint;\nuse Illuminate\Support\Facades\Schema;
class CreateCoursesTable extends Migration\n{\n    /**\n     * Run the migrations.\n     *\n     * @return void\n     */\n    public function up()\n    {\n        Schema::create('courses', function (Blueprint $table) {\n            $table->bigIncrements('id');\n            $table->string('name');\n            $table->text('description');\n            $table->integer('price')->default(0);\n            $table->timestamps();\n        });\n    }
    /**\n     * Reverse the migrations.\n     *\n     * @return void\n     */\n    public function down()\n    {\n        Schema::dropIfExists('courses');\n    }\n}\n```
Then I created the factory function:
```PHP\n$factory->define(Course::class, function (Faker $faker) {\n    return [\n        'name' => $faker->sentence,\n        'description' => $faker->paragraph,\n        'price' => 0,\n    ];\n});\n```
Next, I needed to define the relationships on the `User` and `Course` models.
```PHP\n// app/User.php\npublic function courses()\n{\n    return $this->belongsToMany(Course::class);\n}\n```
```PHP\n// app/Course.php\npublic function users()\n{\n    return $this->belongsToMany(User::class);\n}\n```
In a many-to-many relationship we use the `belongsToMany()` method on both objects. For that, we also need a pivot table.
```\n$ php artisan make:migration create_course_user_table\n```
In that migration we give the foreign keys of both the course and the user:
```PHP\n<?php
use Illuminate\Database\Migrations\Migration;\nuse Illuminate\Database\Schema\Blueprint;\nuse Illuminate\Support\Facades\Schema;
class CreateCourseUserTable extends Migration\n{\n    /**\n     * Run the migrations.\n     *\n     * @return void\n     */\n    public function up()\n    {\n        Schema::create('course_user', function (Blueprint $table) {\n            $table->bigInteger('course_id');\n            $table->bigInteger('user_id');\n            $table->timestamps();\n            $table->primary(['course_id', 'user_id']);\n        });\n    }
    /**\n     * Reverse the migrations.\n     *\n     * @return void\n     */\n    public function down()\n    {\n        Schema::dropIfExists('course_user');\n    }\n}\n```
Now that we have the pivot table, the models, and their relationships defined, the last step is to create the `register()` method on the user so our test will pass.
```PHP\npublic function register(Course $course)\n{\n    $this->courses()->save($course);\n}\n```
This may seem like a stupid method to write when it's only using the existing `save()` method to create the relationship, but really what we are creating is a wrapper that uses the language that makes sense. A user doesn't save a course, they register for it, and having that clarity in our code is important when we come back to it further down the road. 
Not only that, but right now register is pretty simple, but what if register grows in complexity as our app becomes more mature? It'll be nice that the logic was handled within the method so we don't have to find all of the places we are registering and change it.
## In Part 2
In part 2 I plan on designing the actual style of the application through mock-ups so I can begin getting the front-end setup. We will add Vue, tailwindcss with our custom configuration, and begin setting up our routes. Thanks for reading!
