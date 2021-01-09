// $().ready(() => {
//     $('#search-btn').click((e) => {
//         e.preventDefault();
//         async function getJobs() {
//             let inJob = await fetch('/jobs')
//                 .then(response => response.json())
//                 .then(data => renderJobs(data.jobs))
//                 .catch(err => console.log(err));
//             let outJobs = await fetch(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=1a7900be&app_key=048ee3db8a73b77acbe51da7d0ba6e85&results_per_page=50&what=${$('#search-bar').val()}`)
//                 .then(response => response.json())
//                 .then(data => {
//                     console.log(data)
//                     renderOutsideJobs(data.results)
//                 })
//                 .catch(err => console.log(err));
//         }
//         getJobs();
//     })




    
// let renderJobs = (jobTitles) => {
//         $("#jobs-container").empty()
//         $("#mainPic").remove()
//         let searchVal = $('#search-bar').val();
//         searchVal.toLowerCase();
//         let count = 0;
//         jobTitles.map((job) => {
//             if(job.title.toLowerCase().includes(searchVal)) {
//                 let jobID = job.id;
//                 console.log(jobID)
//                 count += 1;
//                 console.log(count)
//                 $("#jobs-container").append(`
//                     <div class="job">
//                         <div class="card" style="width: 60%;margin: auto;margin-top: 25px;">
//                             <h3>${job.title} - ${job.city}, ${job.state}</h3>
//                             <p><sub>${job.companyName}</sub></p>
//                             <p id="descText">${job.description}</p>
//                             <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#jobModal-${count}" id="jobModalBtn-${count}" style="width: 35%; margin: auto;">Read More</button>
//                         </div>
//                         <!-- Modal -->
//                         <div class="modal fade" id="jobModal-${count}" role="dialog">
//                             <div class="modal-dialog">
//                                 <!-- Modal content-->
//                                 <div class="modal-content">
//                                     <div class="modal-header">
//                                         <h4 class="modal-title">${job.title}</h4>
//                                     </div>
//                                     <div class="modal-body">
//                                         <p><sub>${job.companyName}</sub></p>
//                                         <p>${job.description}</p>
//                                         <p><sub>${job.email}</sub></p>
//                                         <p>${job.location}</p>
//                                     </div>
//                                     <div class="modal-footer">
//                                         <form action="/jobs" method="POST">
//                                             <button formmethod="POST" value="${job.id}" type="submit" id="addJob" name="addJob" class="btn btn-default">Add Job</button>
//                                         </form>
//                                         <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <script>
//                         $('#jobModalBtn-${count}').click((e) => {
//                             $('#jobModal-${count}').modal();
//                         })
//                         </script>
//                 `)
//             }
//         })
//     }
// })