package com.a101.ecofarming;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableBatchProcessing
@EnableJpaAuditing
public class EcofarmingApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcofarmingApplication.class, args);
	}

}
