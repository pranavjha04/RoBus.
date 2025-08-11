package models;


import utils.DBManager;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.ArrayList;

public class State {
    private Integer stateId;
    private String name;

    public State(Integer stateId, String name) {
        this.stateId = stateId;
        this.name = name;
    }

    public State() {

    }

    public static ArrayList<State> collectAllRecords() {
        ArrayList<State> states = new ArrayList<>();
        try {
            Connection con = DBManager.getConnection();
            String query = "SELECT * FROM states";
            PreparedStatement ps = con.prepareStatement(query);

            ResultSet rs = ps.executeQuery();

            while(rs.next()) {
                State state = new State(
                    rs.getInt(1), // state_id
                    rs.getString(2) // name
                );
                states.add(state);
            }
        }
        catch(SQLException e) {
            e.printStackTrace();
        }

        return states;
    }
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStateId() {
        return stateId;
    }

    public void setStateId(Integer stateId) {
        this.stateId = stateId;
    }
}