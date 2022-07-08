document.body.style.fontFamily = "Poppins,sans-serif";

let db = openDatabase("mp_agency", "1.0", "test db", 2 * 1024 * 1024);
db.transaction(function (tx) {
  //JOBSEEKER TABLES
  tx.executeSql(
    "create table login(id int, email varchar(40),password varchar(16))"
  );
  tx.executeSql(
    "create table jobseeker(id int primary key,fname varchar(10),lname varchar(10),age int,address varchar(20),email varchar(20))"
  );
  tx.executeSql(
    "create table project(id references jobseeker(id) on delete set null,pname varchar(20),pfield varchar(20))"
  );
  tx.executeSql(
    "create table skills(id references jobseeker(id) on delete set null,skills varchar(20),exp varchar(20))"
  );
  tx.executeSql(
    "create table education(id references jobseeker(id) on delete set null,qualification varchar(10),year int,grade int,place varchar(10))"
  );

  //RECRUITER TABLES
  tx.executeSql(
    "create table recruiter(r_id int primary key,rname varchar(20),company varchar(20),email varchar(20))"
  );
  tx.executeSql(
    "create table job_desc(job_id int primary key,job_name varchar (30),job_desc varchar(100),skills_req varchar(20),experience int,r_id references recruiter(r_id) on delete set null)"
  );
  /*tx.executeSql(
    "create table jobs(id references jobseeker(id) on delete set null, job_id references job_desc(job_id) on delete set null,appln_id int primary key )"
  );
  tx.executeSql(
    "create table application(appln_id references job(appln_id) on delete set null,job_id references job_desc(job_id) on delete set null,id references jobseeker(id) on delete set null,experience int,r_id references recruiter(r_id) on delete set null)"
  );
  tx.executeSql(
    "create table application_status( appln_id references job(appln_id) on delete set null,id references jobseeker(id) on delete set null,status varchar(10))"
  );*/
});

//INSERTING VALUES
db.transaction(function (tx) {
  //LOGIN
  tx.executeSql(
    'insert into login values("1001","john11@gmail.com","hello123")'
  );
  tx.executeSql(
    'insert into login values("1002","alice23@gmail.com","alice123")'
  );
  tx.executeSql(
    'insert into login values("1003","karuna321@gmail.com","kleit123")'
  );
  tx.executeSql(
    'insert into login values("1004","hema123@rediffmail.com","hello123")'
  );
  tx.executeSql(
    'insert into login values("4001","andrewgarfield@infosys.com","garfield234")'
  );
  tx.executeSql(
    'insert into login values("4002","rajan.c@tcs.com","rajan4tcs")'
  );
  tx.executeSql(
    'insert into login values("4003","priyankatiwari@jpmorgan.com","priyanka234")'
  );
  tx.executeSql('insert into login values("4004","sihi@nestle.com","1amsihi")');

  //JOBSEEKER
  tx.executeSql(
    'insert into jobseeker values("1001","John","Matthews","28","Stone,Houston,TX","john11@gmail.com")'
  );
  tx.executeSql(
    'insert into jobseeker values("1002","Alice","Borges","25","Breckswille,Ohio","alice23@gmail.com")'
  );
  tx.executeSql(
    'insert into jobseeker values("1003","Karuna","Pandurangi","22","Hubli,Karnataka,IN","karuna321@gmail.com")'
  );
  tx.executeSql(
    'insert into jobseeker values("1004","Hema","Naidu","25","Mysuru,Karnataka","hema123@rediffmail.com")'
  );

  //RECRUITER
  tx.executeSql(
    'insert into recruiter values("4001","Andrew Garfield","Infosys","andrewgarfield@infosys.com")'
  );
  tx.executeSql(
    'insert into recruiter values("4002","Rajan C","TCS","rajan.c@tcs.com")'
  );
  tx.executeSql(
    'insert into recruiter values("4003","Priyanka Tiwari","J P Morgan & Chase","priyankatiwari@jpmorgan.com")'
  );
  tx.executeSql(
    'insert into recruiter values("4004","Sihi S","Nestle","sihi@nestle.com")'
  );

  //JOB_DESC
});

function valid() {
  let login = 0;
  db.transaction(function (tx) {
    tx.executeSql(
      "select * from login",
      [],
      function (tx, results) {
        let login_id = [];
        let email = [];
        let password = [];
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let int_id = results.rows.item(i).id;
          login_id[i] = int_id.toString();
          email[i] = results.rows.item(i).email;
          password[i] = results.rows.item(i).password;
        }

        //console.log(login_id)
        //console.log(email)
        //console.log(password )

        let jobseeker_login_id = [];
        let recruiter_login_id = [];
        let jobseeker_email = [];
        let recruiter_email = [];
        let jobseeker_password = [];
        let recruiter_password = [];

        for (let j = 0; j < login_id.length; j++) {
          if (login_id[j].charAt(0) == "1") {
            jobseeker_login_id.push(login_id[j]);
          } else if (login_id[j].charAt(0) == "4") {
            recruiter_login_id.push(login_id[j]);
          }
        }

        console.log(jobseeker_login_id);
        console.log(recruiter_login_id);

        for (let x = 0; x < login_id.length; x++) {
          if (x < login_id.length / 2) {
            jobseeker_email.push(email[x]);
            jobseeker_password.push(password[x]);
          } else if (x >= login_id.length / 2) {
            recruiter_email.push(email[x]);
            recruiter_password.push(password[x]);
          }
        }

        let user_id = document.getElementById("user_id").value;
        let email_id = document.getElementById("email").value;
        let pw = document.getElementById("pw").value;
       // let redirect = document.getElementById("link").href;

        if (jobseeker_login_id.includes(user_id)) {
          if (jobseeker_email.includes(email_id)) {
            if (jobseeker_password.includes(pw)) {
              alert("LOGGED IN JOBSEEKER");
              localStorage.setItem("user_id", user_id);
              localStorage.setItem("email_id", email_id);
              display_username()

              window.open("jobseeker.html", "_blank");

              
            } else {
              alert("INCORRECT PASSWORD");
            }
          } else {
            alert("INCORRECT EMAIL");
          }
        } else if (recruiter_login_id.includes(user_id)) {
          if (recruiter_email.includes(email_id)) {
            if (recruiter_password.includes(pw)) {
              alert("LOGGED IN AS RECRUITER");
              
              
              localStorage.setItem("user_id", user_id);
              localStorage.setItem("email_id", email_id);
              display_rec_username()
              window.open("recruiter.html", "_blank");
              
            } else {
              alert("INCORRECT PASSWORD");
            }
          } else {
            alert("INCORRECT EMAIL");
          }
        } else {
          alert("INCORRECT USER ID/DETAILS");
        }

        //window.location.reload();
      },
      null
    );
  });
}

function addjobs() {
  let job_id = document.getElementById("jobid").value;
  let job_name = document.getElementById("jobname").value;
  let job_desc = document.getElementById("jobdes").value;
  let skills = document.getElementById("skills_req").value;
  let experience = document.getElementById("experience").value;
  let r_id = document.getElementById("r_id").value;

  console.log(job_id);

  db.transaction(function (tx) {
    tx.executeSql(
      "insert into job_desc(job_id,job_name,job_desc,skills_req,experience,r_id) values(?,?,?,?,?,?)",
      [job_id, job_name, job_desc, skills, experience, r_id]
    );
  });
}

function search() {
  let search = document.getElementById("search").value;
  db.transaction(function (tx) {
    tx.executeSql(
      `SELECT * FROM job_desc,recruiter where job_name="${search}" and recruiter.r_id=job_desc.r_id`,
      [],
      function (tx, results) {
        let len = results.rows.length;

        console.log(len);
        let apply = "";
        let table = document.getElementById("table");
        for (let i = 0; i < len; i++) {
          console.log(results.rows.item(i).company);
          function name(i) {
            localStorage.setItem("job_id", results.rows.item(i).job_id);
            localStorage.setItem("job_name", results.rows.item(i).job_name);
            localStorage.setItem("rec_id", results.rows.item(i).r_id);
            console.log(results.rows.item(i).job_id);
          }
          let job_name=results.rows.item(i).job_name
          job_name = job_name.toUpperCase()
          apply += `<div class="jobs">
          <div class="content">
            <div class="job-title">
              <input type="text" class="text" value="JOB: ${job_name}" readonly />
            </div>
  
            <div class="job-desc">
              <input
                type="text"
                class="text"
                value="ABOUT: ${results.rows.item(i).job_desc}"
                readonly
              />
            </div>
  
            <div class="job-company">
              <input type="text" class="text" value="COMPANY: ${results.rows.item(i).company}" readonly />
            </div>
          </div>
  
          <div class="card-footer-section">
            <button class="apply" onclick="${name(i)}"><a href="apply.html" class="butlink">Apply</a></button>
          </div>
        </div>`;
        }
        table.innerHTML = apply;
      },
      null
    );
  });
}

function skills() {
  db.transaction(function (tx) {
    let skills_js_id = document.getElementById("skills_js_id").value;
    let skills_js = document.getElementById("js_skills").value;
    let exp = document.getElementById("exp").value;
    tx.executeSql("insert into skills(id,skills,exp) values(?,?,?)", [
      skills_js_id,
      skills_js,
      exp,
    ]);
  });
}
function education() {
  db.transaction(function (tx) {
    let education_js_id = document.getElementById("education_js_id").value;
    let qualif = document.getElementById("qualif").value;
    let year = document.getElementById("year").value;
    let grade = document.getElementById("grade").value;
    let place = document.getElementById("place").value;

    tx.executeSql(
      "insert into education(id,qualification,year,grade,place) values(?,?,?,?,?)",
      [education_js_id, qualif, year, grade, place]
    );
  });
}

function del() {
  db.transaction(function (tx) {
    tx.executeSql("delete from appln_status");
  });
  //job_seeker id
  //job_id
  //job_name---
  //r_id
  //recruiter_name---
  //company---
  //status=1/0
}

/*let appln_id=5003
function appln(appln_id) {
  appln_id+=1
  return appln_id
  console.log(appln_id)
}*/

function submit() {
  let appln_id = localStorage.getItem("appln_id");
  let new_id = parseInt(appln_id);
  new_id += 1;
  let job_name = localStorage.getItem("job_name");
  let id = localStorage.getItem("user_id");
  let job_id = localStorage.getItem("job_id");
  let r_id = localStorage.getItem("rec_id");
  confirm(
    `${document.getElementById("appjsname").value}, sure with all details?`
  );
  db.transaction(function (tx) {
    tx.executeSql(
      "insert into jobs(id,job_id,appln_id,r_id,job_name) values(?,?,?,?,?)",
      [id, job_id, new_id, r_id, job_name]
    );
  });
  localStorage.setItem("appln_id", new_id);

  alert("Your Application Was Submitted SUCCESSFULLY!")
}

function recruiter() {
  db.transaction(function (tx) {
    tx.executeSql(
      `SELECT * FROM jobseeker,jobs,skills,education where jobseeker.id=jobs.id and jobseeker.id=skills.id and jobseeker.id=education.id and r_id="${localStorage.getItem(
        "user_id"
      )}"`,
      [],
      function (tx, results) {
        let container = document.getElementById("container");
        let table = document.getElementById("card");
        let len = results.rows.length;
        //console.log(len);
        let apply = "";
        window.copy_results = results;

        let x = document.createElement("button");
        //x.setAttribute("type", "button");
        x.innerHTML="Accept"
        x.setAttribute("class","accept")

        let y = document.createElement("button");
        //y.setAttribute("type", "button");
        y.innerHTML="Reject"
        y.setAttribute("class","reject")



        for (let i = 0; i < len; i++) {
          apply += `
          <div class="jobs">
          <div class="content">
            <div class="job-title">
              <input type="text" class="text" value="${results.rows.item(i).job_name}" readonly />
            </div>
  
            <div class="job-desc">
              <input
                type="text"
                class="text"
                value="${results.rows.item(i).id}"
                readonly
              />
            </div>
  
            <div class="job-company">
              <input type="text" class="text" value="${results.rows.item(i).fname} ${results.rows.item(i).lname}" readonly />
            </div>
  
            <div class="job-company">
              <input type="text" class="text" value="${results.rows.item(i).skills}" readonly />
            </div>
  
            <div class="job-company">
              <input type="text" class="text" value="${results.rows.item(i).qualification}" readonly />
            </div>
          </div>
  
          <div class="card-footer-section" id="acc-rej"></div>

        </div>

        
      `
// <li><h3>${results.rows.item(i).job_name}</h3></li>
          // <li>${results.rows.item(i).id}</li>
          // <li>${results.rows.item(i).fname} ${results.rows.item(i).lname}</li>
          // <li>${results.rows.item(i).skills}</li>
          // <li>${results.rows.item(i).qualification}</li>
          container.innerHTML = apply;
          
          x.addEventListener("click", function (e) {
            hire(results, i); 
          });
          document.getElementById("acc-rej").appendChild(x);
          y.addEventListener("click", function (e) {
            reject(results, i);
          });
          document.getElementById("acc-rej").appendChild(y);
        }

        document.getElementById("filt").addEventListener("click", function (e) {
          filter(results);
        });
      },
      null
    );
  });
}

function hire2() {
  console.log(copy_results);

  let r_id = localStorage.getItem("user_id");
  db.transaction(function (tx) {
    tx.executeSql(
      `SELECT * FROM recruiter where r_id="${localStorage.getItem("user_id")}"`,
      [],
      function (tx, results) {
        console.log(results.rows.item(0).rname);
        console.log(results.rows.item(0).company);

        localStorage.setItem("rname", results.rows.item(0).rname);
        localStorage.setItem("company", results.rows.item(0).company);
      },
      null
    );
  });
}

function hire(results, i) {
  hire2();
  let x = results;
  let status = "1";
  r_id = localStorage.getItem("user_id");
  rname = localStorage.getItem("rname");
  company = localStorage.getItem("company");
  results2 = x;
  alert("The application is selected for next round! Congratulations")

  db.transaction(function (tx) {
    //console.log(results2.rows.item(0).job_name);
    tx.executeSql(
      "insert into appln_status(id,job_id,job_name,r_id,rname,company,status) values(?,?,?,?,?,?,?)",
      [
        results2.rows.item(i).id,
        results2.rows.item(i).job_id,
        results2.rows.item(i).job_name,
        r_id,
        rname,
        company,
        status,
      ]
    );
  });

}

function reject(results, i) {
  hire2();
  let x = results;
  let status = "0";
  r_id = localStorage.getItem("user_id");
  rname = localStorage.getItem("rname");
  company = localStorage.getItem("company");
  results2 = x;
   alert("The application was rejected!..")
  db.transaction(function (tx) {
    //console.log(results2.rows.item(0).job_name);
    tx.executeSql(
      "insert into appln_status(id,job_id,job_name,r_id,rname,company,status) values(?,?,?,?,?,?,?)",
      [
        results2.rows.item(i).id,
        results2.rows.item(i).job_id,
        results2.rows.item(i).job_name,
        r_id,
        rname,
        company,
        status,
      ]
    );
  });
}

function appln_status() {
  db.transaction(function (tx) {
    tx.executeSql(
      `SELECT * FROM appln_status where id="${localStorage.getItem(
        "user_id"
      )}"`,
      [],
      function (tx, results) {
        let appln_status = document.getElementById("appln_status");
        let text = "";
        let len = results.rows.length;
        for (let index = 0; index < len; index++) {
          if (results.rows.item(index).status=="1") {
            text += `
            <div class="jobs">
        <div class="content">
          <div class="job-desc">
            <input
              type="text"
              class="text"
              value="Congratulations!!,You have been selected for ${
              results.rows.item(index).job_name
            } position at ${results.rows.item(index).company} by ${
            results.rows.item(index).rname
          },
            Accept Offer?"
              readonly
            />
          </div>
        </div>
      </div>
            
          `
          }
          else{
            `
          <li>
            Hey!,Your application for ${
              results.rows.item(index).job_name
            } at ${results.rows.item(index).company} , We wish You luck for next time!
            Thank You
          </li>
          `
          }
          
        }
        console.log(text);
        appln_status.innerHTML = text;
      },
      null
    );
  });
}

function applied_jobs() {
  db.transaction(function (tx) {
    tx.executeSql(
      `SELECT * FROM jobs,recruiter where id="${localStorage.getItem(
        "user_id"
      )}" and recruiter.r_id=jobs.r_id`,
      [],
      function (tx, results) {
        let appln_status = document.getElementById("applied_jobs");
        let text = "";
        let len = results.rows.length;
        for (let index = 0; index < len; index++) {
          text += `
          <div class="jobs">
        <div class="content">
          

          <div class="job-desc">
            <input
              type="text"
              class="text"
              value="  You have applied for ${
                results.rows.item(index).job_name
              } and your application_id is ${
              results.rows.item(index).appln_id
            } at ${results.rows.item(index).company},"
            
              readonly
            />
          </div>

        
        </div>
      </div>
          `
        }
      
        appln_status.innerHTML = text;
      },
      null
    );
  });
}

function filter(results) {
  //experience
  //skills
  //qualification
  //grade
  console.log(results);
  let container = document.getElementById("container");
  container.innerHTML = "";
  let search_filter = document.getElementById("filter").value;
  let len = results.rows.length;
  let apply = "";
  for (let i = 0; i < len; i++) {
    if (
      //results.rows.item(i).job_name == search_filter ||
      results.rows.item(i).age == search_filter ||

      results.rows.item(i).qualification == search_filter ||
      results.rows.item(i).skills == search_filter ||
      results.rows.item(i).exp == search_filter ||
      results.rows.item(i).grade == search_filter
    ) {
      console.log("working");
      apply += `
          <ol id="card">
          <li><h3>${results.rows.item(i).job_name}</h3></li>
          <li>${results.rows.item(i).id}</li>
          <li>${results.rows.item(i).fname} ${results.rows.item(i).lname}</li>
          <li>${results.rows.item(i).skills}</li>
          <li>${results.rows.item(i).qualification}</li>
         </ol>`;
      container.innerHTML = apply;
    } else {
      apply = "Not Found";
      container.innerHTML = apply;
      console.log("not working");
    }
  }
}

function display_username() {
  db.transaction(function (tx) {
    tx.executeSql(
      `SELECT * FROM jobseeker where id="${localStorage.getItem(
        "user_id"
      )}" `,
      [],
      function (tx, results) {
        let username = document.getElementById("username")
        localStorage.setItem("username",results.rows.item(0).fname)
      },
      null
    );
  });
}

function display_rec_username() {
  db.transaction(function (tx) {
    tx.executeSql(
      `SELECT * FROM recruiter where id="${localStorage.getItem(
        "user_id"
      )}" `,
      [],
      function (tx, results) {
        console.log(results.rows.item(0))
        let username = document.getElementById("username")
        localStorage.setItem("rusername",results.rows.item(0).rname)
      },
      null
    );
  });
}