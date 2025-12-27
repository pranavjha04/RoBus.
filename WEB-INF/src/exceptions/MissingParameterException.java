package exceptions;

public class MissingParameterException extends Exception {
    public MissingParameterException() {
        super("Missing Parameter");
    }
}