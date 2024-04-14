## Lists of Feature
  ### Project Structure
      frontend - React js + Typescript + Redux Tookit
      backend -  Express js + AWS S2 + AWS SES
 ### Series Highchart Plot - features/seriesPlot.
   1. Pick Points - show Bullet Points with labels.
   2. Create New Pick Point with lablels.
   3. Move Drag adn Drop Point to New Location.
   4. Change Y axis Min and Max by clicking Y axis.
   5. Zoom search - Comming Soon.
   6. labels to series plots dirctly - Comming Soon.
   7. Vertical line with Text on the line - Comming Soon.
   8. Multi color lines phase wise- Comming Soon.
 ### Chat GPT Parse Resume
 - Comming Soon.
 ### Merge Custom Data with Your PDF (Merge Review Page with Resume).
 - Comming Soon.
 ### AWS SES Service to send the mails with Email templates
  - Comming Soon.
 ### AWS S3 Bucket - Uploading of PDF files. - DONE
  - Comming Soon.
 ### Dockerise App - Frontend(React JS) and backend(Node JS) - 1
  - Comming Soon.
 ### Github Actions  - Created workflow to Deploy the App. -  2
  - Comming Soon.
 ### Unit/Integration Testing (Jest) - Creating workflow for Jest Unit/Integration testing 
  - Comming Soon.
 ### End to End test with Cypress - Creating workflow to test Cypress EndtoENd Tests.
  - Comming Soon.
  

How to setup Github Action with AWS

Ref- https://www.youtube.com/watch?v=-nT1Xs7-qqA&ab_channel=TheTechTeam

1. Setup Runner on AWS instance 
2. Install Docker instance
3. Install Docker compose on instance
 `sudo curl -L "https://github.com/docker/compose/releases/download/v2.12.2/docker-compose-$(uname -s)-$(uname -m)"  -o /usr/local/bin/docker-compose
sudo mv /usr/local/bin/docker-compose /usr/bin/docker-compose
sudo chmod +x /usr/bin/docker-compose`
  
before running this cmd always check latest version here:- https://github.com/docker/compose/releases

To Run the build you have to running

`cd action-runner`
`./run.sh`

To give the permission to above folder `action-runner` to run first time

- sudo -i // go to root of linux instance
- sudo groupadd docker
- sudo usermod -aG docker ubuntu
- sudo su - ubuntu // got back to ubuntu user



  


  


