package utils;

import java.net.URL;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;

import java.io.IOException;
import java.io.DataOutputStream;
import java.io.OutputStream;
import java.io.InputStream;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;

public class RecaptchaManager {
    public static boolean checkCaptchaValid(String response, String secret) {
        boolean flag = true;
        try {
            URL url = new URL("https://www.google.com/recaptcha/api/siteverify?secret=" + secret + "&response=" + response);

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);

            DataOutputStream dos = new DataOutputStream(connection.getOutputStream());

            dos.flush();
            dos.close();

            int statusCode = connection.getResponseCode();

            if(statusCode == HttpURLConnection.HTTP_OK) {
                InputStream is = connection.getInputStream();
                JsonReader jr = Json.createReader(is);
                JsonObject jo = jr.readObject();
                flag = jo.getBoolean("success");
            }
        }
        catch(MalformedURLException | ProtocolException e) {
            flag = false;
            e.printStackTrace();
        }
        catch(IOException e) {
            flag = false;
            e.printStackTrace();
        }
        return flag;
    }
}