package models;

import java.sql.Date;
import java.sql.Timestamp;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.SQLException;

import utils.DBManager;
import utils.EncryptionManager;

import exceptions.PasswordMismatchException;

public class User implements Cloneable {

    private Integer userId;
    private String fullName;
    private Date dob;
    private String contact;
    private Integer gender;
    private String email;
    private String password;
    private String profilePic;
    private Status status;
    private String verificationCode;
    private Timestamp createdAt;   
    private Timestamp updatedAt; 
    private UserType userType;


    public User(Integer userId, String fullName, Date dob, String contact, Integer gender, 
            String email, String password, String profilePic, Status status, 
            String verificationCode, Timestamp createdAt, Timestamp updatedAt, 
            UserType userType) {
        this(fullName, contact, email, password, dob, gender,status, userType);
        this.userId = userId;
        this.profilePic = profilePic;
        this.verificationCode = verificationCode;
        this.createdAt = new Timestamp(createdAt.getTime());
        this.updatedAt = new Timestamp(updatedAt.getTime());
    }


    public User(String fullName, String contact, String email, String password, Date dob, Integer gender) {
        this.fullName = fullName;
        this.contact = contact;
        this.email = email;
        this.password = password;
        this.dob = new Date(dob.getTime());
        this.gender = gender;
    }

    public User(String fullName, String contact, String email, String password, Date dob, Integer gender, Status status, UserType userType) {
        this(fullName, contact, email, password, dob, gender);
        this.status = status.clone();
        this.userType = userType.clone();
    }

    
    public User() {}

    public boolean updateUserType(int targetType) {
        if(getUserType().getUserTypeId() == targetType) {
            return true;
        }

        boolean flag = false;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "UPDATE users SET user_type_id=? " + 
                    "WHERE user_id=?";

            PreparedStatement ps = con.prepareStatement(query);
            ps.setInt(1, targetType);
            ps.setInt(2, userId);

            flag = ps.executeUpdate() == 1;
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }

        return flag;
    }

    public static User getUserById(int userId) {
        User user = null;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "SELECT * FROM USERS " +
                    "JOIN status ON users.status_id = status.status_id " +
                    "JOIN user_types ON users.user_type_id = user_types.user_type_id " +
                    "WHERE user_id=?";
            
            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, userId);

            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
                user = new User(
                        rs.getInt("user_id"), 
                        rs.getString("full_name"),
                        rs.getDate("dob"),
                        rs.getString("contact"),
                        rs.getInt("gender"),
                        rs.getString("email"),
                        rs.getString("password"),
                        rs.getString("profile_pic"),
                        new Status(rs.getInt("status.status_id"), rs.getString("status.name")),
                        rs.getString("verification_code"),
                        rs.getTimestamp("created_at"),
                        rs.getTimestamp("updated_at"),
                        new UserType(rs.getInt("user_types.user_type_id"), rs.getString("user_types.name"))
                    );
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        return user;
    }

    public static User login(String email, String password) throws PasswordMismatchException {
        User user = null;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "SELECT * FROM USERS " +
                    "JOIN status ON users.status_id = status.status_id " +
                    "JOIN user_types ON users.user_type_id = user_types.user_type_id " +
                    "WHERE email=?";

            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, email);

            ResultSet rs = ps.executeQuery();
            // dekho ki koi record aaya hai ya nahi
            if(rs.next()) {
                // check password sahi nahi hai toh bhaga do usko
                if(!EncryptionManager.checkPassword(password, rs.getString("password"))) {
                    throw new PasswordMismatchException("Wrong password");
                }   
                
                user = new User(
                    rs.getInt("user_id"), 
                    rs.getString("full_name"),
                    rs.getDate("dob"),
                    rs.getString("contact"),
                    rs.getInt("gender"),
                    rs.getString("email"),
                    rs.getString("password"),
                    rs.getString("profile_pic"),
                    new Status(rs.getInt("status.status_id"), rs.getString("status.name")),
                    rs.getString("verification_code"),
                    rs.getTimestamp("created_at"),
                    rs.getTimestamp("updated_at"),
                    new UserType(rs.getInt("user_types.user_type_id"), rs.getString("user_types.name"))
                );
            }   

            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        return user;
    }
    public boolean addRecord() {
        boolean flag = false;
        try {
            Connection con = DBManager.getConnection();
            String query = 
                    "INSERT INTO users " +
                    "(full_name,contact,email,password,dob,gender,status_id,user_type_id) " +
                    "VALUES (?,?,?,?,?,?,?,?)";

            PreparedStatement ps = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, fullName);
            ps.setString(2, contact);
            ps.setString(3, email);
            ps.setString(4, EncryptionManager.encryptPassword(password));
            ps.setDate(5, dob);
            ps.setInt(6, gender);
            ps.setInt(7, 2); // STATUUS -> NOT VERIFIED
            ps.setInt(8, 1); // USER TYPE -> PASSENGER 

            flag = ps.executeUpdate() == 1;
            if(flag) {
                ResultSet rs = ps.getGeneratedKeys();
                if(rs.next()) {
                    userId = rs.getInt(1);

                }
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        return flag;
    }

    public static boolean checkUniqueEmail(String email) {
        boolean flag = true;
        try {
            Connection con = DBManager.getConnection();
            String query = "SELECT user_id FROM users WHERE email=?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, email);
            
            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
                flag = false;
            }
            con.close();
        }   
        catch(SQLException e) {
            e.printStackTrace();
        }
        return flag;
    }

    public static boolean checkUniqueContact(String contact) {
        boolean flag = true;
        try {
            Connection con = DBManager.getConnection();
            String query = "SELECT user_id FROM users WHERE contact=?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, contact);
            
            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
                flag = false;
            }
            con.close();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        return flag;
    }

    @Override
    public User clone() {
        return new User(
            getUserId(),
            getFullName(),
            getDob(),
            getContact(),
            getGender(),
            getEmail(),
            getPassword(),
            getProfilePic(),
            status.clone(),
            getVerificationCode(),
            getCreatedAt(),
            getUpdatedAt(),
            getUserType()
        );
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Date getDob() {
        return new Date(dob.getTime());
    }

    public void setDob(Date dob) {
        this.dob = new Date(dob.getTime());
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public Status getStatus() {
        return status.clone();
    }

    public void setStatus(Status status) {
        this.status = status.clone();
    }


    public Timestamp getCreatedAt() {
        return new Timestamp(createdAt.getTime());
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = new Timestamp(createdAt.getTime());
    }

    public Timestamp getUpdatedAt() {
        return new Timestamp(updatedAt.getTime());
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = new Timestamp(updatedAt.getTime());;;
    }

    public UserType getUserType() {
        return userType.clone();
    }

    public void setUserType(UserType userType) {
        this.userType = userType.clone();
    }
}
