 
  
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
  },
  {
    learner_id: 13,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  },
  {
    learner_id: 13,
    assignment_id: 3,
    submission: {
      submitted_at: "2024-01-25",
      score: 400
    }
  }
];

 
//the learner’s total, weighted average, in which assignments
// with more points_possible should be counted for more
// e.g. a learner with 50/100 on one assignment and 190/200 on another
// would have a weighted average score of 240/300 = 80%.
 
 function getIdsTotalWeightedAverage(id,AssignmentGroup,LearnerSubmissions){
           //loop through learnersubmissions
           //if learner id matches 
           //1 get score  add to score total
           //get points possible and add to grand totalgetting form addiynmnet group 
           let totalscore=0;
           let totalpossible=0;
           for (let i = 0; i < LearnerSubmissions.length; i++) {
            if(LearnerSubmissions[i].learner_id==id && isDue(LearnerSubmissions[i].submission.submitted_at)){
            submission = LearnerSubmissions[i].submission;
            totalscore +=submission.score;
        

            //now get points possibe for that assignmnet submission
            pointsPossible=getsPointsPossible(LearnerSubmissions[i].assignment_id,AssignmentGroup);
            //console.log(`Learner ID: ${LearnerSubmissions[i].learner_id}, Assignment ID: ${LearnerSubmissions[i].assignment_id}, Score: ${subscore},points possible: ${pointsPossible}`);
            totalpossible+=pointsPossible
            }
          }
          return (totalscore/totalpossible);

 }
 function getsPointsPossible(assignmentId, Assignmentgroup){
 

  for (let i = 0; i < Assignmentgroup.assignments.length; i++){
  
    if (assignmentId==Assignmentgroup.assignments[i].id){
    
        return Assignmentgroup.assignments[i].points_possible;
    }
  }
  console.log("the assignemnt ws not found in Assignemnt Group");
  return null;
 }
function getGrade(id,AssignmentGroup,LearnerSubmissions){

}
function getListOfAssignmentsandGrades(id,AssignmentGroup,LearnerSubmissions){
  let listofAssignments = [];
  for (let i = 0; i < LearnerSubmissions.length; i++) {
  console.log("checkingdate",isDue(LearnerSubmissions[i].submission.submitted_at),LearnerSubmissions[i].submission.submitted_at)
    if(LearnerSubmissions[i].learner_id==id && isDue(LearnerSubmissions[i].submission.submitted_at)){
      
      let pp= getsPointsPossible(LearnerSubmissions[i].assignment_id,AssignmentGroup) ;
      let gradeofassignment =(LearnerSubmissions[i].submission.score/pp);
      console.log(`Aissignment id ${LearnerSubmissions[i].assignment_id} and grade ${gradeofassignment}`)
      listofAssignments.push({
          assignmentId:LearnerSubmissions[i].assignment_id,
          grade:gradeofassignment
        });
    }
    console.log("making progress",listofAssignments);
   
       


  }
  return listofAssignments;
}
function isDue(dueDate) {
  const today = new Date();
  const dueTimestamp = new Date(dueDate);
  console.log((today >= dueTimestamp),today,dueTimestamp);
  return today >= dueTimestamp;
}


 function getLearnerData(courseInfo,assignmentGroup,learnerSubmissions){
    
    
     try{
     if(courseInfo.id!=assignmentGroup.course_id){ //should this be on a try catch block ?
      throw ("Input is invalid: Course id does not match to the assignment group course ID")
     };
     //check for if points availbale are zero 
     for (let i=0; i<assignmentGroup.assignments.length; i++){
      // console.log("assignemnt group",assignmentGroup.assignments[i].points_possible);
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
    // id:
    // avrage:
    // listofAssignments:
    let learners=[];
    for (let i = 0; i < learnerSubmissions.length; i++) {
      if(!learners.includes(learnerSubmissions[i].learner_id)){
        learners.push(learnerSubmissions[i].learner_id)
      }
    }
    console.log(learners);
    let result =[];
    for (let i = 0; i < learners.length; i++){
      //for every student get 
      // id:
     // avrage:
     // listofAssignments:
     let weightedave=getIdsTotalWeightedAverage(learners[i],assignmentGroup,learnerSubmissions);
     let listofAssignments=getListOfAssignmentsandGrades(learners[i],assignmentGroup,learnerSubmissions);

     
     result.push({
      id:learners[i],
      ave:weightedave,
      assignments:listofAssignments
      
     })
    }
    
    // each assignment should have a key with its ID,
    // and the value associated with it should be the percentage that
    // the learner scored on the assignment (submission.score / points_possible)

   

    
    return result;
  }
  
  





  
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log("result:",JSON.stringify(result));
  