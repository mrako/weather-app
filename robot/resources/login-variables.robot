*** Variables ***

${VALID EMAIL}                    user@hopefully.works
${VALID PASSWORD}                 hopeless

${INVALID EMAIL}                  thisISnotAn@EMAIL
${INVALID PASSWORD}               notvalidpassword

${EMPTY PASSWORD}


*** Keywords ***

Login
  [Arguments]     ${email}    ${password}
  Input Text      email       ${email}
  Input Text      password    ${password}
  Click Button    Login
