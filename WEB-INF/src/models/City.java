package models;

import java.util.ArrayList;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import utils.DBManager;

public class City {
    private Integer cityId;
    private String name;
    private State state;

    public City(Integer cityId, String name, State state) {
        this.cityId = cityId;
        this.name = name;
        this.state = new State(state.getStateId(), state.getName());
    }

    public City() {

    }

    public static ArrayList<City> collectAllRecords() {
        ArrayList<City> cities = new ArrayList<>();

        try {
            Connection con = DBManager.getConnection();
            String query = "SELECT cities.city_id, cities.name, states.state_id, states.name FROM cities JOIN states ON cities.state_id = states.state_id"; // city_id,name,state_id,name
            PreparedStatement ps = con.prepareStatement(query);

            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                City city = new City(
                    rs.getInt(1), // city_id
                    rs.getString(2), // name
                    new State(
                        rs.getInt(3), // state_id
                        rs.getString(4) // name
                    )
                );
                cities.add(city);
            }
            ps.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }

        return cities;
    }    
    public State getState() {
        return new State(state.getStateId(), state.getName());
    }

    public void setState(State state) {
        this.state = new State(state.getStateId(), state.getName());
    }

    public String getName() {
        return name;
    } 

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCityId() {
        return cityId;
    }

    public void setCityId(Integer cityId) {
        this.cityId = cityId;
    }
}