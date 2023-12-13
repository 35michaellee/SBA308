 function getLearnerData(courseInfo,assignmentGroup,learnerSubmission){
     
     try{
     if(courseInfo.id!=assignmentGroup.course_id){ //should this be on a try catch block ?
      throw ("Input is invalid: Course id does not match to the assignment group course ID")
     };
     //check for if points availbale are zero 
     for (let i=0; i<assignmentGroup.assignments.length; i++){
      console.log("assignemnt group",assignmentGroup.assignments[i].points_possible);
      if(assignmentGroup.assignments[i].points_possible<=0){//test for it being a zero and test for it being a number not a string 
        throw ("assignment: "+assignmentGroup.assignments[i].name+" has a value less then or equal to zero");
      }
      if(isNaN(assignmentGroup.assignments[i].points_possible)){

        throw ("assignment: "+ assignmentGroup.assignments[i].nam+" has a value for points possible that is a string not a number.Please change");
      }
     }
    }//end of try block
    catch(e){
      console.log(e);
    }
    //loop through Learner Submissions
    let assignmentsDue=[];//assigenmnts that are due 
    let results = [];
    let listofLearners=[];//this would be easier with key value pairs
    
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let todaysdate=`${year}-${month}-${day}`;
    console.log("todays date",todaysdate);
    
   
    //loop through assignment group to filter out assigntmnys not yet used add them to result .
     for (let i=0; i<assignmentGroup.assignments.length; i++){
      //check if assigenment is due- if not do not include it so use a continue
      if((assignmentGroup.assignments[i].due_at<todaysdate)){//the due date is before now 
        assignmentsDue.push({id:assignmentGroup.assignments[i].id})
        continue;
      }
      //add the addigenmts
      console.log(assignmentGroup.assignments[i].due_at,todaysdate, "due now: ",(assignmentGroup.assignments[i].due_at<todaysdate));
     }
     //now loop through the learber submission 

     for (let i=0; i<learnerSubmission.length; i++){
         if(!listofLearners.includes(learnerSubmission[i].learner_id)){
          listofLearners.push(learnerSubmission[i].learner_id);
         } 
         //check if learner id is in list of learbers 
     }
     console.log(listofLearners);

     //Calculate total learners weight average 
    return results;
 }

const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 454,//dummby data
        name: "Declare a Variable101",
        due_at: "2023-01-25",
        points_possible: 0
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log("result;",result);
  