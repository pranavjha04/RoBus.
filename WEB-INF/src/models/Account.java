package models;

public interface Account {
    void setField(String fieldName, String value);
    void setFile(String fieldName, String value);
    boolean saveRecord();
    // Account getRecord(String email, String password);
}