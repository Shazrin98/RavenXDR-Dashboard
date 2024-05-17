import time
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from email.mime.base import MIMEBase
from email import encoders
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Specify the path to the downloaded chromedriver executable
chromedriver_path = '/usr/bin/chromedriver'

# Wazuh Dashboard URL
dashboard_url = 'https://172.17.7.12/goto/c02e21509df19545b59fbb856f4d9301'

# Wazuh Dashboard credentials
username = 'admin'
password = 'xlfMAaCiiQBW31RRcqZx.BRPeKME9IlT'

# Set up Chrome options
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run Chrome in headless mode (no GUI)
chrome_options.add_argument("--ignore-certificate-errors")  # Ignore SSL certificate errors
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--window-size=1920,2540")  # Adjust the screen size to be captured from here
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--no-sandbox")

# Set up the Selenium WebDriver with the specified chromedriver path and options
service = Service(executable_path=chromedriver_path)
driver = webdriver.Chrome(service=service, options=chrome_options)

try:
    # Open the Wazuh Dashboard URL
    driver.get(dashboard_url)

    # Wait for the username input field to be present and clickable
    username_input = WebDriverWait(driver, 20).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-test-subj="user-name"]'))
    )

    # Find the password input field
    password_input = driver.find_element(By.CSS_SELECTOR, '[data-test-subj="password"]')

    # Enter credentials
    username_input.send_keys(username)
    password_input.send_keys(password)

    # Wait for the login button to be clickable
    login_button = WebDriverWait(driver, 20).until(
        EC.element_to_be_clickable((By.XPATH, '//*[@data-test-subj="submit"]'))
    )

    # Click the login button
    login_button.click()
    print("Login successfully.")
    # Wait for the loading spinner to disappear
    WebDriverWait(driver, 60).until_not(
        EC.presence_of_element_located((By.CSS_SELECTOR, '[data-test-subj="loadingLogo"]'))
    )

    # Locate the dashboard element
    dashboard_element = WebDriverWait(driver, 60).until(
        EC.presence_of_element_located((By.XPATH, '//a[@href="#/dashboard/dc0cc0a0-f724-11ed-89b7-c5673a4cd968"]'))
    )

    # Scroll to the dashboard element
    driver.execute_script("arguments[0].scrollIntoView();", dashboard_element)

    # Wait for a moment to let the page load (you can adjust the sleep duration)
    time.sleep(5)

    driver.maximize_window()

    # Take a screenshot of the dashboard
    screenshot_path = 'dashboard_screenshot.png'
    driver.save_screenshot(screenshot_path)
    print("Screenshot of the dashboard saved successfully.")

    # Send email with the screenshot as an attachment using Outlook
    sender_email = 'ravenxdr@outlook.com'
    receiver_email = 'm.mohsinashraf11@gmail.com'
    email_password = 'Xdr@124211'

    subject = 'RavenXDR Dashboard report'
    body = 'Hello,\n\nAttached is the screenshot of the RavenXDR Dashboard. Please review it.\n\nBest regards,\nMohsin Ashraf'

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'plain'))

    # Attach the screenshot to the email
    with open(screenshot_path, 'rb') as attachment:
        part = MIMEBase('application', 'octet-stream')
        part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', "attachment; filename= %s" % screenshot_path)
        msg.attach(part)

    # Set up the SMTP server for Outlook
    outlook_smtp_server = 'smtp.office365.com'
    outlook_smtp_port = 587

    server = smtplib.SMTP(outlook_smtp_server, outlook_smtp_port)
    server.starttls()
    server.login(sender_email, email_password)
    server.sendmail(sender_email, receiver_email, msg.as_string())
    server.quit()

    print("Email sent successfully.")

except Exception as e:
    print("Error:", e)

finally:
    # Close the browser
    driver.quit()
