require "spec_helper"

describe TestersController do
  describe "routing" do

    it "routes to #index" do
      get("/testers").should route_to("testers#index")
    end

    it "routes to #new" do
      get("/testers/new").should route_to("testers#new")
    end

    it "routes to #show" do
      get("/testers/1").should route_to("testers#show", :id => "1")
    end

    it "routes to #edit" do
      get("/testers/1/edit").should route_to("testers#edit", :id => "1")
    end

    it "routes to #create" do
      post("/testers").should route_to("testers#create")
    end

    it "routes to #update" do
      put("/testers/1").should route_to("testers#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/testers/1").should route_to("testers#destroy", :id => "1")
    end

  end
end
