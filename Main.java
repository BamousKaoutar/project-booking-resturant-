
// Main.java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.print("Veuillez entrer votre nom : ");
        String nom = scanner.nextLine();

        System.out.println("Bienvenue, " + nom + " !");

        scanner.close();
    }
}
