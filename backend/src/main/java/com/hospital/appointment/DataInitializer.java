package com.hospital.appointment;

import com.hospital.appointment.model.Doctor;
import com.hospital.appointment.model.User;
import com.hospital.appointment.repository.DoctorRepository;
import com.hospital.appointment.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(DoctorRepository doctorRepository, UserRepository userRepository) {
        return args -> {
            if (doctorRepository.count() == 0) {
                doctorRepository.saveAll(List.of(
                    new Doctor(null, "Dr. Sarah Connor", "Cardiologist", "12 Years", "https://images.unsplash.com/photo-1559839734-2b71f1502827?w=400&h=400&fit=crop"),
                    new Doctor(null, "Dr. James Smith", "Dermatologist", "8 Years", "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"),
                    new Doctor(null, "Dr. Emily Chen", "Pediatrician", "15 Years", "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop"),
                    new Doctor(null, "Dr. Michael Brown", "Neurologist", "10 Years", "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop"),
                    new Doctor(null, "Dr. William Davis", "Orthopedist", "20 Years", "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop")
                ));
            }
            
            if (userRepository.count() == 0) {
                userRepository.save(new User(null, "System Admin", "admin@careplus.com", "1234567890", "admin", "admin"));
            }
        };
    }
}
