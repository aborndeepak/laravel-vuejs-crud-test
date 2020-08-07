<template>
      <div class="row justify-content-center" id="team_data">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                 Teams
                   <a class="float-right" href="/players">Player</a>
                </div>
                <div class="card-body">
                    <div v-if="view_team">
                            <form @submit.prevent="addTeam">
                                <div v-bind:class="{ succmsg: succmsg }">
                                    <div class="form-group">
                                        <div class="alert alert-success">Team created successfully</div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-8">
                                        <label for="team_name">Team Name</label>
                                        <input type="text" @keydown.space="preventLeadingSpace" name="team_name" id="team_name" required class="form-control" placeholder="Team name...." v-model="team.name"/>
                                        <label class="text-danger" v-if="err_msg">{{err_msg}}</label>
                                    </div>
                                    <div class="form-group col-4 h-100 d-table">
                                        <input type="submit" name="btnAddTeam" value="Add New Team" class="btn btn-primary btn-sm align-middle"/>
                                    </div>
                                </div>
                            </form>
                            <table class="table table-bordered" v-if="team_list">
                                <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                    
                                        <tr v-for="team in team_list">
                                            <th>{{ team.id }}</th>
                                            <td>{{ team.name }}</td>
                                            <td><button class="btn btn-sm btn-info" v-on:click="view_team_details(team.id,team.name)">View Details</button></td>
                                        </tr>
                                    
                                </tbody>
                            </table>
                    </div>
                    <div v-if="team_details">
                         <div class="card">
                                <div class="card-header">
                                    {{team.name}}
                                    <span class="text-danger float-right" v-on:click="close_view" style="cursor:pointer" title="Close Details">&#10060;</span>
                                </div>
                                <div class="card-body">
                                     <p class="text-center font-weight-bold">Team Players</p>
                                     <form @submit.prevent="addPlayer">
                                            <div v-bind:class="{ succmsg: succmsg }">
                                                <div class="form-group">
                                                    <div class="alert alert-success">Player created successfully</div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="form-group col-4">
                                                    <label for="p_first_name">First Name</label>
                                                    <input type="text" name="p_first_name"  @keydown.space="preventLeadingSpace" id="p_first_name" required class="form-control" placeholder="First name...." v-model="player.first_name"/>
                                                </div>
                                                <div class="form-group col-4">
                                                    <label for="p_first_name">Last Name</label>
                                                    <input type="text" name="p_last_name"  @keydown.space="preventLeadingSpace" id="p_last_name" required class="form-control" placeholder="Last name...." v-model="player.last_name"/>
                                                </div>
                                                <div class="form-group col-4">
                                                    <input type="submit" name="btnAddPlayer" value="Add Player" class="btn btn-primary btn-sm"/>
                                                </div>
                                            </div>
                                     </form>
                                     <table class="table table-bordered">
                                            <thead>
                                                   <tr>
                                                       <th>First Name</th>
                                                       <th>Last Name</th>
                                                       <th>Action</th>
                                                   </tr>
                                            </thead>
                                            <tbody>
                                                  <template v-if="players">
                                                        <tr v-for="player in players">
                                                            <td>{{player.first_name}}</td>
                                                            <td>{{player.last_name}}</td>
                                                            <td><button class="btn btn-sm btn-info" v-on:click="update_player(player.id)" data-toggle="modal" data-target="#updatePlayer">Update</button></td>
                                                        </tr>
                                                  </template>
                                                  <template v-if="!players">
                                                        <tr>
                                                            <td colspan="3" align="center">No Player Forund</td>
                                                        </tr>
                                                  </template>
                                            </tbody>
                                     </table>
                                </div>
                         </div>
                    </div>

                    <div class="modal fade" id="updatePlayer" tabindex="-1" role="dialog" aria-labelledby="updatePlayerTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Update</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="updatePlayer">
                                    <div class="form-group">
                                        <label for="first_name">First Name</label>
                                        <input type="text" @keydown.space="preventLeadingSpace" name="first_name" id="first_name" required class="form-control" placeholder="First name...." v-model="tmp_player.first_name"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="first_name">Last Name</label>
                                        <input type="text" @keydown.space="preventLeadingSpace" name="last_name" id="last_name" required class="form-control" placeholder="Last name...." v-model="tmp_player.last_name"/>
                                    </div>
                                    <div class="form-group">
                                       <button type="sunmit" class="btn btn-primary btn-sm float-right">Update</button>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>  



</template>


<script>
import axios from 'axios'
      
     
    export default {
        name:"team_data", 
        data () {
            return {
                team_list:[],
                team:{
                      'name':''
                },
                players:[],
                player:{
                      'first_name':'',
                      'last_name':'',
                      'team_id':'',
                      'team_name':''
                },
                tmp_player:{
                      'first_name':'',
                      'last_name':'',
                      'team_id':'',
                },
                succmsg:  true,
                err_msg  : '',
                view_team:true,
                team_details:false
            }
         },
         created(){
             this.fetchData();
         },
         methods:{
                  // API endpoint to add a team 
             addTeam() {
                    if(this.team.name==""){
                         this.err_msg = "Please enter team name";
                    }
                    axios.post(`/api/teams`, {
                        name: this.team.name
                    })
                    .then(response => {
                          this.succmsg = false;
                          this.fetchData();
                          this.team.name = "";
                    })
                    .catch(e => {
                         alert(e)
                    })
            },
             addPlayer() {
                    if(this.player.first_name==""){
                         this.err_msg = "Please enter player first name";
                    }
                    axios.post(`/api/players`, {
                        first_name: this.player.first_name,
                        last_name: this.player.last_name,
                        team_id : this.player.team_id
                    })
                    .then(response => {
                          this.succmsg = false;
                          this.view_team_details(this.player.team_id);
                          
                    })
                    .catch(e => {
                         alert(e)
                    })
            },
            updatePlayer(){
                alert();
            },
            async fetchData() {
                  await axios.get('/api/teams')
                    .then(response => {
                            this.team_list = response.data.data
                    })
                    .catch(function (resp) {
                        console.log(resp);
                        alert("Could not load teams");
                    });
            },
            //API endpoint to get a team and its players 
           async view_team_details(team_id,team_name){
                  this.view_team =  false;
                  this.team_details = true;
                  if(team_name){
                    this.team.name = team_name;
                  }
                  
                  this.player.team_id = team_id;
                  await axios.get(`/api/players/${team_id}`)
                    .then(response => {
                        this.players = response.data;
                    })
                    .catch(function (resp) {
                        console.log(resp);
                        alert("Could not load teams details");
                    });
            },
            close_view:function(){
                  this.players = [];
                  this.team.name = '';
                  this.player.team_id = '';
                  this.view_team =  true;
                  this.team_details = false;
            },
             preventLeadingSpace(e) {
                if (!e.target.value) e.preventDefault();
                else if (e.target.value[0]==' ') e.target.value = e.target.value.replace(/^\s*/, "");
            },
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