$().ready(() => {
    fetch('/userJobs')
        .then(response => response.json())
        .then((data) => {
            let jobIds = [];
            for (i = 0; i < data.jobs.length; i++) {
                jobIds[i] = data.jobs[i].JobId;
            }


            Promise.all(
                jobIds.map((id) => {
                    return fetch(`/jobs/matchJob/${id}`)
                        .then(response => response.json())
                })).then(jobs => {

                    let jobPick = JSON.stringify(jobs)
                    let job2 = JSON.parse(jobPick)
                    console.log(job2[0][0])
                    console.log(job2[0])

                    let pickjob = job2[0];
                    console.log(pickjob)

                    for (let i = 0; i < pickjob.length; i++) {
                        console.log(pickjob[i].title)
                        $("#added-jobs").append(`
                                <div class="job">
                                    <div class="card" style="width: 60%;margin: auto;margin-top: 25px;">
                                        <h3>${pickjob[i].title} - ${pickjob[i].city}, ${pickjob[i].state}</h3>
                                        <p><sub>${pickjob[i].companyName}</sub></p>
                                        <p id="descText">${pickjob[i].description}</p>
                                    </div>
                                </div>`)
                    }

                })

        })


})


// $().ready(() => {
//     fetch('/userJobs')
//         .then(response => response.json())
//         .then((data) => {
//             let jobIds = [];
//             for(i = 0; i < data.jobs.length; i++){
//                 jobIds[i] = data.jobs[i].JobId;
//             }
//             console.log(jobIds)
//             console.log(typeof jobIds)
//             // findJobs(jobIds);

//             Promise.all( 
//                 jobIds.map((id) => {
//                     return fetch(`jobs/matchJob/${id}`)
//                         .then(response => response.json())
//                         })).then(jobs => {
//                             // console.log(jobs)
//                             // console.log(JSON.stringify(jobs))
//                             let jobPick = JSON.stringify(jobs)
//                             let job2 = JSON.parse(jobPick)
//                             console.log(job2[0])
                        
//                             console.log(Object.keys(jobs).length)
//                             for(let i=0; i<Object.keys(job2).length; i++){
//                                 console.log(job2)
//                             $("#added-jobs").append(`
//                                 <div class="job">
//                                     <div class="card" style="width: 60%;margin: auto;margin-top: 25px;">
//                                         <h3>${job2[i].title} - ${jobs.city}, ${jobs.state}</h3>
//                                         <p><sub>${jobs.companyName}</sub></p>
//                                         <p id="descText">${jobs.description}</p>
//                                     </div>
//                                 </div>`)
//                             }
//             })
           
//         })


//     })
