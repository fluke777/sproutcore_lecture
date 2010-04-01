require 'rubygems'
require 'sinatra'
require 'json'

people = [
    {
      :guid       => "/people/1",
      :name     => "Tomas",
      :projects => ["/projects/1", "/projects/2"]
    },
    {
      :guid       => "/people/2",
      :name     => "Pavel",
      :projects => ["/projects/1"]
    },
    {
      :guid       => "/people/3",
      :name       => "Martin",
      :projects   => ["/projects/2"]
    }
  ]

projects = [
    { 
      :guid     => "/projects/1",
      :title    => "Foodmart",
      :people   => ["/people/1", "/people/2"]
    },
    {
      :guid     => "/projects/1",
      :title  => "Salesforce",
      :people   => ["/people/1", "/people/3"]
    }
  ]

get '/people/' do
  wrap_to_content(people).to_json
end

get '/people/:id' do
  id = params[:id].to_i - 1
  wrap_to_content(people[id]).to_json
end

get '/projects/' do
  wrap_to_content(projects).to_json
end

get '/projects/:id' do
  id = params[:id].to_i - 1
  wrap_to_content(projects[id]).to_json
end

def wrap_to_content(what)
  {:content => what}
end