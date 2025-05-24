import static org.assertj.core.api.Assertions.assertThat;
import org.springframework.beans.factory.annotation.Autowired;
import com.reservation.Reservation.services.ReservationService;

@SpringBootTest
class ReservationApplicationTests {

    @Autowired
    private ReservationService reservationService;

    @Test
    void contextLoads() {
        System.out.println("✅ Contexte Spring chargé.");
    }

    @Test
    void reservationServiceBeanShouldBeLoaded() {
        assertThat(reservationService).isNotNull();
    }
}
