*** Settings ***

Resource   ${CURDIR}/../resources/common.robot
Resource   ${CURDIR}/../resources/login-variables.robot

Test Setup          Open browser and go to homepage
Test Teardown       Close All Browsers

*** Test cases ***

Should see three tempbox areas
  Login                  ${VALID EMAIL}    ${VALID PASSWORD}
  Verify homepage is open

  Wait Until Element Is Visible    css:.tempbox-area    timeout=10s
  ${count}=    Get Element Count    css:.tempbox-area
  Should Be True    ${count} >= 3    msg=Expected at least 3 tempbox areas, but found ${count}
