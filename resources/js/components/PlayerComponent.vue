<template>
      <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    Players
                    <a class="float-right" href="/teams">Teams</a>
                </div>
                <div class="card-body">
                    <form @submit.prevent="onSubmit" method="post">
                         <div v-bind:class="{ succmsg: succmsg }">
                              <div class="form-group">
                                  <div class="alert alert-success">Team created successfully</div>
                              </div>
                         </div>
                        <div class="row">
                            <div class="form-group col-4">
                                  <label for="team_name">Team Name</label>
                                  <select class="form-control" name="team_name">
                                      <option>Select Team Name</option>
                                  </select>
                            </div>
                            <div class="form-group col-3">
                                <label for="p_first_name">First Name</label>
                                <input type="text" name="p_first_name" id="p_first_name" required class="form-control" placeholder="First name...." v-model="player.first_name"/>
                            </div>
                            <div class="form-group col-3">
                                <label for="p_first_name">Last Name</label>
                                <input type="text" name="p_last_name" id="p_last_name" required class="form-control" placeholder="Last name...." v-model="player.last_name"/>
                            </div>
                            <div class="form-group col-2">
                                <input type="submit" name="btnAddPlayer" value="Add New" class="btn btn-primary btn-sm mt-4"/>
                            </div>
                        </div>
                         
                    </form>
                    <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="player in players">
                            <th>{{ player.id }}</th>
                            <td>{{ player.first_name }}</td>
                            <td>{{ player.last_name }}</td>
                          </tr>
                        </tbody>
                     
                    </table>
                </div>
            </div>
        </div>
    </div>  
</template>


<script>

      
     
    export default {
         
         data: function () {
            return {
                players:[],
                player:{
                      'first_name':'',
                      'last_name':''
                },
                succmsg:  true,
            }
         },
         created() {
             this.fetchData();
         },
         methods:{
           onSubmit() {
                    alert("he;;;p"); 
                    e.preventDefault();
                   
             },
           fetchData() {
                var app = this;
                axios.get('http://127.0.0.1:8000/api/players')
                    .then(function (resp) {
                      app.players = resp.data.data;
                    })
                    .catch(function (resp) {
                        console.log(resp);
                        alert("Could not load Players");
                    });
          }
          
         }
    }
    
    
</script>

<style scoped>
    .succmsg {
        display: none;
    }
    .showmodal {
        display: none !important;
        opacity: 0;
    }
</style>