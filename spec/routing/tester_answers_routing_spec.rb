require "spec_helper"

describe TesterAnswersController do
  describe "routing" do

    it "routes to #index" do
      get("/tester_answers").should route_to("tester_answers#index")
    end

    it "routes to #new" do
      get("/tester_answers/new").should route_to("tester_answers#new")
    end

    it "routes to #show" do
      get("/tester_answers/1").should route_to("tester_answers#show", :id => "1")
    end

    it "routes to #edit" do
      get("/tester_answers/1/edit").should route_to("tester_answers#edit", :id => "1")
    end

    it "routes to #create" do
      post("/tester_answers").should route_to("tester_answers#create")
    end

    it "routes to #update" do
      put("/tester_answers/1").should route_to("tester_answers#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/tester_answers/1").should route_to("tester_answers#destroy", :id => "1")
    end

  end
end
