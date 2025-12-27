package utils;

import models.Seating;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import java.util.Random;
public final class AppUtil {
    private static final Random random = new Random();
    
    private AppUtil() {

    }
    
    public static final String concat(String ...words) {
        return String.join("", words);
    }

    public static final int generateRandomOTP() {
        return random.nextInt(888888) + 111111;
    }
    
    public static final int generateRandomInt() {
        return Math.abs(random.nextInt());
    }

    public static final boolean isIncludeRequest(String request, String[] acceptedIncludeRequestList) {
        for(String next : acceptedIncludeRequestList) {
            if(request.equals(next)) {
                return true;
            }
        }
        return false;
    }

    public static void formateSeatingRecord(ArrayList<Seating> seatingList) {
        switch(seatingList.size()) {
            case 1 : {
                Seating firstSeating = seatingList.get(0);
                if(firstSeating.getDeck()) {
                    seatingList.set(0, null);
                    seatingList.add(firstSeating);
                }
                break;
            }
            case 2 : {
                Seating firstSeating = seatingList.get(0);
                Seating secondSeating = seatingList.get(1);

                if(firstSeating.getDeck()) {
                    seatingList.set(0, secondSeating);
                    seatingList.set(1, firstSeating);
                }
                break;
            }
            default : 
                break;
        }
    }

    public static Map<Integer, Pair> getFormattedSeatChargeRecord(String[] target) throws IllegalArgumentException {
        Map<Integer, Pair> map = new HashMap<>();
        if(target == null || target.length == 0) throw new IllegalArgumentException();

        for(String next : target) {
            String[] splitRecord = next.split("_");
            if(splitRecord.length != 3) throw new IllegalArgumentException("Invalid Format");

            Integer seat = Integer.parseInt(splitRecord[0]);
            Integer isSleeper = Integer.parseInt(splitRecord[1]);
            Integer charge = Integer.parseInt(splitRecord[2]);


            if(map.containsKey(seat)) throw new IllegalArgumentException("Duplicate Seat");
            map.put(seat, new Pair<Integer, Integer>(isSleeper, charge));
        }
        return map;
    }
}