package learn.petsitter.data.mappers;

import learn.petsitter.models.CareVisit;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

public class CareVisitMapper implements RowMapper<CareVisit> {

    //unnecessary but leaving here just in case
//    private String processTime(String str) {
//        String newString = "";
//        if (str.startsWith("-")) {
//            newString = str.substring(1);
//        } else {
//            newString = str;
//        }
//
//        return newString;
//    }

    @Override
    public CareVisit mapRow(ResultSet resultSet, int i) throws SQLException {
        CareVisit cv = new CareVisit();

        String time = resultSet.getString("time_of_day");
        //time = processTime(time);
        //System.out.println(time);
        LocalTime t = LocalTime.parse(time) ;

        cv.setCareVisitId(resultSet.getInt("care_visit_id"));
        cv.setStartDate(resultSet.getObject("start_date", LocalDate.class));
        cv.setEndDate(resultSet.getObject("end_date", LocalDate.class));
        cv.setStatus(resultSet.getString("status"));
        cv.setTimeOfDay(t);
        cv.setNotes(resultSet.getString("notes"));
        cv.setCost(resultSet.getBigDecimal("cost"));
        cv.setOwnerId(resultSet.getInt("owner_id"));
        cv.setSitterId(resultSet.getInt("sitter_id"));

        return cv;
    }
}
