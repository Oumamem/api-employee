const employeeRoutes = (app, fs) => {
  // variables
  const dataPath = "./dataset/MOCK_DATA.json";
  /*     var json = dataPath
    json = JSON.parse(JSON.stringify(json).split('"How old are you?":').join('"age":'));
    json = JSON.parse(JSON.stringify(json).split('"What industry do you work in?":').join('"industry":'));
    json = JSON.parse(JSON.stringify(json).split('"Job title":').join('"job_title":'));
    json = JSON.parse(JSON.stringify(json).split('"What is your annual salary?":').join('"annual_salary":'));
    json = JSON.parse(JSON.stringify(json).split('"Please indicate the currency":').join('"currency":'));
    json = JSON.parse(JSON.stringify(json).split('"Where are you located? (City/state/country)":').join('"location":'));
    json = JSON.parse(JSON.stringify(json).split('"How many years of post-college professional work experience do you have?":').join('"experience":'));
    json = JSON.parse(JSON.stringify(json).split('"If your job title needs additional context, please clarify here:":').join('"additional_informations1":'));
     */
  // READ
  app.get("/employee", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      res.send(JSON.parse(data));
    });
  });
  app.get("/field_of_job", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      data = JSON.parse(data);
      const employee = data.filter((employee) =>
        req.query.industry ? employee.industry == req.query.industry : true
      );

      if (err) {
        throw err;
      }
      res.send(employee);
    });
  });
  app.get("/sort_data", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      data = JSON.parse(data);
      console.log(req.query.sortBy);
      field = req.query.sortBy;
      console.log(field);
      const employee = data.sort((a, b) =>
        ("" + a[field]).localeCompare(b[field])
      );
      if (err) {
        throw err;
      }
      res.send(employee);
    });
  });
  app.get("/filter_data", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      data = JSON.parse(data);
      employee = data.filter(
        (employee) =>
          employee.salary < req.query.salaire &&
          (req.query.country ? employee.country == req.query.country : true)
      );
      if (err) {
        throw err;
      }
      if (err) {
        throw err;
      }
      res.send(employee);
    });
  });

  app.get("/select_data", (req, res) => {

    fs.readFile(dataPath, "utf8", (err, data) => {
      data = JSON.parse(data);
      if (err) {
        throw err;
      }

      let employee;
      let toReturn = [];
      let fields = req.query.fields.split(",");
      employee = data.map((emp) => {
        let obj = {};
        fields.map((field) => {
          console.log(emp[field]);
          obj[field] = emp[field];
        });
        toReturn.push(obj);
      });
      res.send(toReturn);

      
    });
  });

  app.get("/:id", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      data = JSON.parse(data);

      const employee = data.filter((employee) => employee.id == req.params.id);
      if (err) {
        throw err;
      }
      res.send(employee);
    });
  });
};

module.exports = employeeRoutes;
