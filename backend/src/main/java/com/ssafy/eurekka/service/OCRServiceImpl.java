package com.ssafy.eurekka.service;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class OCRServiceImpl implements OCRService {

	@Value("${OCR.APIURL}")
	private String APIURL;

	@Value("${OCR.SECRETKEY}")
	private String SECRETKEY;

	@Override
	public String findOCRResult(MultipartFile expirationDateImg) {

		try {
			URL url = new URL(APIURL);
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			con.setUseCaches(false);
			con.setDoInput(true);
			con.setDoOutput(true);
			con.setReadTimeout(30000);
			con.setRequestMethod("POST");
			String boundary = "----" + UUID.randomUUID().toString().replaceAll("-", "");
			con.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
			con.setRequestProperty("X-OCR-SECRET", SECRETKEY);

			JSONObject json = new JSONObject();
			json.put("version", "V2");
			json.put("requestId", UUID.randomUUID().toString());
			json.put("timestamp", System.currentTimeMillis());
			JSONObject image = new JSONObject();
			image.put("format", "jpg");
			image.put("name", "sample");
			JSONArray images = new JSONArray();
			images.put(image);
			json.put("images", images);
			String postParams = json.toString();

			con.connect();
			DataOutputStream wr = new DataOutputStream(con.getOutputStream());
			long start = System.currentTimeMillis();

			String fileName = expirationDateImg.getOriginalFilename();
			String prefix = fileName.substring(fileName.lastIndexOf("."));

			File file = null;
			try {
				file = File.createTempFile(fileName, prefix);
				expirationDateImg.transferTo(file);
			} catch (Exception e) {
				e.printStackTrace();
			}

			writeMultiPart(wr, postParams, file, boundary);
			wr.close();

			int responseCode = con.getResponseCode();
			BufferedReader br;
			if (responseCode == 200) {
				br = new BufferedReader(new InputStreamReader(con.getInputStream()));
			} else {
				br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
			}
			String inputLine;
			StringBuffer response = new StringBuffer();
			while ((inputLine = br.readLine()) != null) {
				response.append(inputLine);
			}
			br.close();

			// response json parser
			StringBuilder sb = new StringBuilder();
			JSONObject responseJson = new JSONObject(response.toString());
			JSONArray responseJsonArrayImages = new JSONArray(responseJson.get("images").toString());
			JSONObject responseJsonArrayImagesJson = new JSONObject(responseJsonArrayImages.get(0).toString());
			JSONArray responseJsonArrayImagesJsonFields = new JSONArray(
					responseJsonArrayImagesJson.get("fields").toString());
			int fieldsSize = responseJsonArrayImagesJsonFields.length();
			for (int i = 0; i < fieldsSize; i++) {
				JSONObject bj = new JSONObject(responseJsonArrayImagesJsonFields.get(i).toString());
				sb.append(bj.get("inferText"));
			}

			System.out.println(sb);

			// post processing expiration day
			char[] preExpirationDate = sb.toString().toCharArray();
			int index = 0;

			for (int i = 0; i < preExpirationDate.length; i++) {
				if ((preExpirationDate[i] - '0') < 10 && (preExpirationDate[i] - '0') >= 0) {
					index = i;
					break;
				}
			}
			String year = "";
			String month = "";
			String day = "";

			int cnt = 0;
			for (int i = index; i < preExpirationDate.length; i++) {
				if ((preExpirationDate[i] - '0') < 10 && (preExpirationDate[i] - '0') >= 0) {
					year += preExpirationDate[i];
					cnt++;
				}
				if (cnt == 2) {
					index = i + 1;
					cnt = 0;
					break;
				}
			}

			if (year.equals("20")) {
				for (int i = index; i < preExpirationDate.length; i++) {
					if ((preExpirationDate[i] - '0') < 10 && (preExpirationDate[i] - '0') >= 0) {
						year += preExpirationDate[i];
						cnt++;
					}
					if (cnt == 2) {
						index = i + 1;
						cnt = 0;
						break;
					}
				}
				for (int i = index; i < preExpirationDate.length; i++) {
					if ((preExpirationDate[i] - '0') < 10 && (preExpirationDate[i] - '0') >= 0) {
						month += preExpirationDate[i];
						cnt++;
					}
					if (cnt == 2) {
						index = i + 1;
						cnt = 0;
						break;
					}
				}
				for (int i = index; i < preExpirationDate.length; i++) {
					if ((preExpirationDate[i] - '0') < 10 && (preExpirationDate[i] - '0') >= 0) {
						day += preExpirationDate[i];
						cnt++;
					}
					if (cnt == 2) {
						index = i + 1;
						cnt = 0;
						break;
					}
				}

			} else if (Integer.parseInt(year) > 20) {
				year = "20" + year;
				for (int i = index; i < preExpirationDate.length; i++) {
					if ((preExpirationDate[i] - '0') < 10 && (preExpirationDate[i] - '0') >= 0) {
						month += preExpirationDate[i];
						cnt++;
					}
					if (cnt == 2) {
						index = i + 1;
						cnt = 0;
						break;
					}
				}
				for (int i = index; i < preExpirationDate.length; i++) {
					if ((preExpirationDate[i] - '0') < 10 && (preExpirationDate[i] - '0') >= 0) {
						day += preExpirationDate[i];
						cnt++;
					}
					if (cnt == 2) {
						index = i + 1;
						cnt = 0;
						break;
					}
				}
			} else {
				year = "2021";
				for (int i = index; i < preExpirationDate.length; i++) {
					if ((preExpirationDate[i] - '0') < 10 && (preExpirationDate[i] - '0') >= 0) {
						month += preExpirationDate[i];
						cnt++;
					}
					if (cnt == 2) {
						index = i + 1;
						cnt = 0;
						break;
					}
				}
				for (int i = index; i < preExpirationDate.length; i++) {
					if ((preExpirationDate[i] - '0') < 10 && (preExpirationDate[i] - '0') >= 0) {
						day += preExpirationDate[i];
						cnt++;
					}
					if (cnt == 2) {
						index = i + 1;
						cnt = 0;
						break;
					}
				}
				if (Integer.parseInt(month) > 12 || Integer.parseInt(day) > 31) {
					return "TRY AGAIN";
				}
			}
			return year + "-" + month + "-" + day;

		} catch (Exception e) {
			System.out.println(e);
			return "FAIL";
		}

	}

	private static void writeMultiPart(OutputStream out, String jsonMessage, File file, String boundary)
			throws IOException {
		StringBuilder sb = new StringBuilder();
		sb.append("--").append(boundary).append("\r\n");
		sb.append("Content-Disposition:form-data; name=\"message\"\r\n\r\n");
		sb.append(jsonMessage);
		sb.append("\r\n");

		out.write(sb.toString().getBytes("UTF-8"));
		out.flush();

		if (file != null && file.isFile()) {
			out.write(("--" + boundary + "\r\n").getBytes("UTF-8"));
			StringBuilder fileString = new StringBuilder();
			fileString.append("Content-Disposition:form-data; name=\"file\"; filename=");
			fileString.append("\"" + file.getName() + "\"\r\n");
			fileString.append("Content-Type: application/octet-stream\r\n\r\n");
			out.write(fileString.toString().getBytes("UTF-8"));
			out.flush();

			try (FileInputStream fis = new FileInputStream(file)) {
				byte[] buffer = new byte[8192];
				int count;
				while ((count = fis.read(buffer)) != -1) {
					out.write(buffer, 0, count);
				}
				out.write("\r\n".getBytes());
			}

			out.write(("--" + boundary + "--\r\n").getBytes("UTF-8"));
		}
		out.flush();
	}

}
