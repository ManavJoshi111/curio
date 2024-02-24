import React from "react";
import { Container, Row, Col, Alert, Image } from "react-bootstrap";

const ConnectionDown = () => {
  const placeholderImage =
    "https://via.placeholder.com/300?text=Internet+Connection+Lost"; // Placeholder image URL

  return (
    <Container
      fluid
      className="d-flex align-items-center vh-100"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      <Row className="justify-content-center">
        <Col md={8}>
          <Alert
            variant="warning"
            className="rounded-3 shadow-lg border-0"
            style={{ backgroundColor: "#fff" }}
          >
            <Row className="align-items-center">
              <Col md={4} className="text-center pt-4">
                <div
                  className="rounded-circle d-block mx-auto"
                  style={{ height: "150px", width: "150px" }}
                >
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="150.000000pt"
                    height="150.000000pt"
                    viewBox="0 0 567.000000 499.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,499.000000) scale(0.100000,-0.100000)"
                      fill="#000000"
                      stroke="none"
                    >
                      <path
                        d="M1605 4180 c-158 -21 -311 -100 -438 -225 -36 -35 -45 -64 -22 -72 6
-1 30 16 55 38 84 76 146 119 221 153 67 31 198 66 247 66 11 0 25 7 33 16 10
13 10 17 -2 25 -15 9 -20 9 -94 -1z"
                      />
                      <path
                        d="M1804 4145 c-9 -22 2 -30 61 -45 107 -29 255 -111 314 -174 29 -31
61 -35 61 -7 0 43 -187 172 -305 210 -98 32 -124 35 -131 16z"
                      />
                      <path
                        d="M1578 3944 c-14 -3 -32 -12 -39 -20 -21 -26 4 -31 112 -26 144 7 268
-33 367 -119 34 -30 72 -38 72 -16 0 36 -122 121 -226 158 -58 20 -224 34
-286 23z"
                      />
                      <path
                        d="M1405 3879 c-63 -35 -139 -104 -130 -118 11 -19 36 -12 78 23 23 18
58 41 77 51 49 24 70 44 63 61 -7 20 -31 16 -88 -17z"
                      />
                      <path
                        d="M1615 3739 c-87 -20 -195 -84 -195 -115 0 -27 30 -26 67 3 63 48 114
65 199 67 65 1 79 4 82 18 5 26 -86 43 -153 27z"
                      />
                      <path
                        d="M1821 3683 c0 -22 86 -86 105 -79 24 9 15 33 -23 65 -42 35 -83 41
-82 14z"
                      />
                      <path
                        d="M1632 3524 c-30 -21 -30 -77 0 -98 32 -22 55 -20 84 9 31 31 55 31
119 1 78 -36 139 -121 151 -208 l6 -43 -55 -33 c-100 -59 -178 -167 -203 -282
-18 -83 -21 -1397 -3 -1482 28 -135 128 -260 259 -322 l65 -31 917 -3 918 -3
25 53 c114 234 128 510 36 756 -50 136 -175 300 -301 397 -199 153 -464 222
-698 181 -50 -9 -99 -16 -107 -16 -13 0 -15 32 -15 228 -1 189 -3 235 -18 277
-56 163 -182 275 -342 305 -32 6 -58 17 -64 27 -14 25 -57 63 -71 63 -18 0
-63 -38 -70 -59 -5 -15 -21 -19 -103 -24 -53 -4 -109 -10 -124 -13 -23 -5 -28
-3 -28 13 0 39 -34 119 -67 160 -40 50 -106 92 -160 100 -23 4 -48 17 -65 35
-29 32 -53 35 -86 12z m738 -273 c15 -30 14 -31 -35 -31 -30 0 -45 4 -45 13 0
37 62 51 80 18z m-140 -81 c0 -10 -6 -39 -14 -62 -8 -24 -17 -57 -21 -75 -3
-17 -17 -39 -31 -47 -49 -33 -21 -116 40 -116 53 0 74 74 34 117 -20 22 -21
28 -11 76 6 29 18 70 27 92 l16 38 98 -7 c106 -7 176 -26 235 -63 53 -33 107
-90 140 -145 58 -99 57 -82 57 -1040 l0 -878 -317 0 c-175 0 -344 4 -377 10
-181 29 -318 170 -346 356 -7 46 -10 300 -7 745 3 734 2 712 61 813 57 97 185
182 294 196 105 14 122 12 122 -10z m1032 -795 c278 -57 504 -234 627 -490 71
-147 86 -213 86 -380 0 -87 -5 -159 -14 -190 -36 -136 -81 -242 -104 -251 -7
-2 -111 -3 -232 -2 l-219 3 63 34 c74 39 186 145 225 213 185 319 41 693 -296
764 -136 29 -255 -3 -351 -94 -82 -79 -119 -160 -120 -267 -2 -92 26 -160 92
-225 173 -171 443 -89 458 138 4 56 1 74 -19 111 -61 113 -199 145 -287 65
-104 -93 -51 -254 83 -254 66 0 121 76 101 139 -9 31 -45 61 -71 61 -36 0 -38
-19 -4 -31 79 -28 48 -134 -38 -132 -28 1 -43 9 -65 34 -25 27 -29 38 -25 74
7 56 33 91 85 111 72 28 154 -10 193 -91 60 -124 -50 -283 -198 -285 -53 0
-143 37 -185 77 -139 133 -106 374 66 486 64 41 123 59 198 58 144 0 288 -81
366 -205 87 -137 85 -333 -4 -499 -36 -66 -143 -175 -208 -211 -108 -60 -159
-69 -405 -70 l-225 -1 0 645 0 645 65 17 c84 22 264 23 362 3z"
                      />
                      <path
                        d="M1930 2385 c0 -32 30 -73 66 -90 64 -30 136 5 150 73 4 21 3 32 -5
32 -6 0 -11 -8 -11 -19 0 -10 -11 -30 -25 -45 -47 -50 -128 -28 -150 42 -7 25
-25 30 -25 7z"
                      />
                      <path
                        d="M2200 2385 c0 -32 30 -73 66 -90 64 -30 136 5 150 73 4 21 3 32 -5
32 -6 0 -11 -8 -11 -19 0 -10 -11 -30 -25 -45 -47 -50 -128 -28 -150 42 -7 25
-25 30 -25 7z"
                      />
                      <path
                        d="M2140 2131 c-11 -8 0 -11 43 -11 69 0 160 -24 199 -53 15 -11 31 -17
35 -13 10 10 -20 33 -75 58 -50 23 -179 35 -202 19z"
                      />
                    </g>
                  </svg>
                </div>
              </Col>
              <Col md={8} className="text-start py-4 px-5">
                <h3 className="mb-3 fw-bold">Internet Connection Lost</h3>
                <p className="lead">
                  Unfortunately, your device is currently not connected to the
                  internet. This means you may not be able to access all
                  features or view the latest information.
                </p>
                <ul className="list-unstyled mb-0">
                  <li>Some features may be unavailable.</li>
                  <li>Data may not be updated in real-time.</li>
                </ul>
                <div className="mt-3">
                  <span className="text-primary fw-bold">
                    To reconnect to the internet:
                  </span>
                  <ul className="list-unstyled mt-2">
                    <li>
                      Check your Wi-Fi connection or try using a different
                      network.
                    </li>
                    <li>Restart your device or router.</li>
                    <li>
                      Contact your internet service provider if the issue
                      persists.
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default ConnectionDown;
