import React, { FC } from 'react';

interface ISpottedZebraLogo {
  width: number;
  height: number;
}

const SpottedZebraLogo: FC<ISpottedZebraLogo> = props => {
  const { width, height } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 641 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.150717 56.4636C28.4854 61.1358 54.4087 52.545 80.0305 42.1455C91.1836 37.624 102.789 35.2125 114.846 35.8154C117.258 35.9661 119.82 35.0618 122.985 39.1312C111.982 37.624 102.638 39.5833 93.4443 42.7484C77.6191 48.3249 61.7938 54.0521 45.3657 58.2722C30.4448 62.1908 15.5238 65.3559 0 65.3559C0.150717 62.4923 0.150717 59.4779 0.150717 56.4636Z"
        fill="#212121"
      />
      <path
        d="M77.0161 64.753C91.6356 69.7267 105.351 69.1238 118.765 71.2338C120.272 71.5353 121.779 71.5353 123.135 71.8367C124.793 72.2888 126.602 72.4396 126.602 74.851C126.451 77.4132 125.095 78.3175 122.834 78.4682C116.655 78.9204 110.475 78.7697 104.447 77.1118C100.679 76.0568 96.76 75.3032 92.9921 74.0975C77.7697 68.9731 63.4516 70.631 49.2843 78.0161C41.8992 81.9347 33.9112 84.6476 26.0739 87.8127C24.1146 88.5662 21.8538 89.0184 19.5931 89.3198C18.0859 89.4706 16.428 88.8677 15.9759 87.3605C15.5237 85.5519 17.0309 84.6476 18.3874 84.1955C23.5117 82.3869 28.4854 80.2768 33.7604 78.7697C44.612 75.7553 54.5593 71.2338 63.7531 64.753C78.5233 54.2029 95.4035 48.6263 112.585 44.1048C115.147 43.3513 118.011 43.3513 120.724 43.2005C124.341 43.0498 126.3 45.0091 126.451 48.4756C126.602 53.1478 122.985 50.8871 121.025 50.8871C111.53 51.1885 102.487 53.4493 93.8964 57.8201C88.9227 60.3822 83.6477 62.0401 77.0161 64.753Z"
        fill="#212121"
      />
      <path
        d="M17.031 104.09C44.6122 101.076 69.3297 87.3605 96.4587 82.6883C104.145 81.3319 111.681 80.8797 119.368 81.784C121.176 81.9347 123.889 81.4826 123.738 84.3462C123.588 86.9084 121.025 87.0591 119.217 87.2098C115.449 87.5112 111.681 88.2648 108.064 87.8127C94.9515 86.3055 82.5927 90.5256 69.9325 92.3342C68.4254 92.4849 66.6168 92.7863 66.6168 94.5949C66.4661 96.2528 68.2747 96.8557 69.6311 97.6093C75.9612 100.774 82.5928 100.624 89.2243 99.2671C94.8008 98.0614 100.076 95.9514 105.652 94.4442C110.325 93.0877 114.846 90.827 120.724 90.9777C119.82 94.7456 118.463 97.1571 114.695 98.5136C97.2122 104.844 79.7291 109.516 61.191 102.583C54.5594 100.171 47.9279 101.98 41.4471 103.638C35.7199 105.145 29.9926 106.652 24.2654 108.31C20.7989 108.913 18.2367 108.612 17.031 104.09Z"
        fill="#212121"
      />
      <path
        d="M119.669 32.801C109.571 33.5546 99.6238 34.0068 89.5258 34.9111C72.1934 36.569 55.4638 40.789 38.7343 45.3105C29.0884 47.8727 19.2918 49.0784 9.34451 48.777C7.08376 48.777 4.52158 49.2292 1.20581 46.3655C9.34451 45.7627 16.1268 45.612 22.7583 44.7077C26.8276 44.1048 34.062 44.4062 33.7606 40.1862C33.4592 35.6647 26.5262 36.8704 22.1554 36.7197C16.8803 36.4182 11.6053 36.7197 5.87803 36.7197C7.23448 33.1025 10.2488 33.4039 12.6603 33.1025C19.5932 32.3489 26.5262 32.0475 33.4592 33.2532C53.3538 36.8704 72.7962 35.2125 92.3894 30.8417C99.4731 29.1838 106.557 28.2795 113.791 28.4303C116.805 28.1288 119.518 28.4303 119.669 32.801Z"
        fill="#212121"
      />
      <path
        d="M114.243 23.9088C89.3749 25.7174 65.4109 36.2676 39.3369 26.6217C40.9948 25.416 41.5977 24.8131 42.0498 24.8131C62.698 25.2652 82.894 21.648 103.391 19.8394C107.009 19.3873 111.379 17.7294 114.243 23.9088Z"
        fill="#212121"
      />
      <path
        d="M102.638 12.605C72.3439 15.0165 42.6527 16.2222 12.8108 25.2652C16.7294 18.6337 20.4973 14.8658 27.7317 14.7151C49.5857 14.4136 71.1381 11.3993 92.9921 9.59069C96.1571 9.28926 100.076 8.23424 102.638 12.605Z"
        fill="#212121"
      />
      <path
        d="M47.3249 67.0138C33.3083 70.0281 21.251 77.7146 7.68646 81.3318C2.56209 82.839 2.26066 79.0711 1.50707 75.6046C0.452058 70.7817 3.46639 71.0831 6.63144 71.0831C15.6744 71.0831 24.2653 68.5209 32.8561 66.5616C37.5283 65.3559 42.3513 63.3966 47.3249 67.0138Z"
        fill="#212121"
      />
      <path
        d="M107.612 107.557C98.7194 118.71 91.9371 120.518 78.3727 116.449C69.7818 113.887 61.9445 108.31 52.1479 108.913C70.2339 106.652 88.3199 113.284 107.612 107.557Z"
        fill="#212121"
      />
      <path
        d="M83.7986 78.7697C61.6432 87.3605 39.0357 94.7456 15.6747 98.815C14.0168 99.1164 11.756 99.7193 11.3039 97.4585C10.701 94.5949 13.4139 95.3485 14.7704 95.0471C22.0048 93.3892 29.2392 92.0327 36.6243 90.5256C44.9137 88.8677 52.9017 86.4562 60.4375 82.3869C67.3705 78.4682 75.3584 76.8103 83.7986 78.7697Z"
        fill="#212121"
      />
      <path
        d="M85.0042 2.80849C66.7675 5.21996 49.8872 7.63142 32.4041 8.385C40.0906 0.698456 72.0425 -2.91874 85.0042 2.80849Z"
        fill="#212121"
      />
      <path
        d="M24.416 111.927C45.0642 108.159 61.7937 118.71 81.6883 122.779C77.0161 125.643 73.7003 126.095 70.5353 124.738C56.5187 119.011 42.502 113.887 26.9782 114.037C26.3753 114.037 25.7725 113.133 24.416 111.927Z"
        fill="#212121"
      />
      <path
        d="M94.9514 63.698C104.597 60.3822 114.545 59.0258 124.492 59.0258C126.903 59.0258 128.26 59.9301 127.958 62.4922C127.808 64.4516 128.411 66.863 125.396 66.863C115.147 66.863 104.899 66.5616 94.9514 63.698Z"
        fill="#212121"
      />
      <path
        d="M78.0713 93.0877C85.155 92.4849 92.2386 91.882 100.377 91.1284C94.3487 96.5542 86.6621 97.3078 78.0713 93.0877Z"
        fill="#212121"
      />
      <path
        d="M52.7509 123.08C45.6673 125.04 41.5979 122.327 37.5286 119.614C42.3515 118.86 46.7223 120.217 52.7509 123.08Z"
        fill="#212121"
      />
      <path
        d="M8.89229 87.662C10.7009 87.662 12.5095 87.662 12.3588 89.6213C12.2081 91.2792 10.3995 91.4299 9.043 91.5806C7.68655 91.7313 6.63154 91.1285 6.48082 89.772C6.02867 87.3605 8.1387 88.1141 8.89229 87.662Z"
        fill="#212121"
      />
      <path
        d="M173.24 90.72C169.736 90.72 166.64 90.24 163.952 89.28C161.264 88.272 158.696 86.664 156.248 84.456C155.24 83.592 154.736 82.608 154.736 81.504C154.736 80.64 155.072 79.872 155.744 79.2C156.416 78.48 157.208 78.12 158.12 78.12C158.936 78.12 159.632 78.384 160.208 78.912C162.128 80.688 164.096 82.008 166.112 82.872C168.176 83.688 170.504 84.096 173.096 84.096C176.12 84.096 178.664 83.4 180.728 82.008C182.84 80.616 183.896 78.864 183.896 76.752C183.848 74.256 182.792 72.336 180.728 70.992C178.712 69.6 175.616 68.448 171.44 67.536C166.496 66.528 162.68 64.872 159.992 62.568C157.352 60.264 156.032 57.072 156.032 52.992C156.032 50.16 156.776 47.688 158.264 45.576C159.752 43.416 161.816 41.76 164.456 40.608C167.096 39.456 170.072 38.88 173.384 38.88C176.36 38.88 179.168 39.36 181.808 40.32C184.448 41.28 186.584 42.552 188.216 44.136C189.32 45.096 189.872 46.128 189.872 47.232C189.872 48.096 189.536 48.864 188.864 49.536C188.24 50.208 187.472 50.544 186.56 50.544C185.888 50.544 185.336 50.352 184.904 49.968C183.656 48.72 181.928 47.664 179.72 46.8C177.512 45.936 175.4 45.504 173.384 45.504C170.168 45.504 167.6 46.176 165.68 47.52C163.808 48.816 162.872 50.544 162.872 52.704C162.872 55.056 163.808 56.856 165.68 58.104C167.6 59.352 170.432 60.408 174.176 61.272C177.92 62.088 180.968 63.048 183.32 64.152C185.72 65.256 187.568 66.792 188.864 68.76C190.16 70.728 190.808 73.296 190.808 76.464C190.808 79.248 190.016 81.72 188.432 83.88C186.896 86.04 184.784 87.72 182.096 88.92C179.408 90.12 176.456 90.72 173.24 90.72Z"
        fill="#212121"
      />
      <path
        d="M217.954 51.624C221.218 51.624 224.17 52.464 226.81 54.144C229.45 55.776 231.514 58.08 233.002 61.056C234.538 64.032 235.306 67.392 235.306 71.136C235.306 74.88 234.538 78.24 233.002 81.216C231.514 84.144 229.45 86.448 226.81 88.128C224.17 89.808 221.266 90.648 218.098 90.648C215.602 90.648 213.274 90.096 211.114 88.992C208.954 87.888 207.202 86.544 205.858 84.96V100.944C205.858 101.904 205.522 102.72 204.85 103.392C204.226 104.064 203.41 104.4 202.402 104.4C201.442 104.4 200.626 104.064 199.954 103.392C199.33 102.768 199.018 101.952 199.018 100.944V55.656C199.018 54.648 199.33 53.808 199.954 53.136C200.578 52.464 201.394 52.128 202.402 52.128C203.41 52.128 204.226 52.464 204.85 53.136C205.522 53.808 205.858 54.648 205.858 55.656V57.744C207.01 56.064 208.69 54.624 210.898 53.424C213.106 52.224 215.458 51.624 217.954 51.624ZM217.162 84.312C219.37 84.312 221.362 83.736 223.138 82.584C224.914 81.432 226.282 79.872 227.242 77.904C228.25 75.888 228.754 73.632 228.754 71.136C228.754 68.64 228.25 66.408 227.242 64.44C226.282 62.424 224.914 60.84 223.138 59.688C221.362 58.536 219.37 57.96 217.162 57.96C214.906 57.96 212.89 58.536 211.114 59.688C209.338 60.792 207.946 62.352 206.938 64.368C205.978 66.384 205.498 68.64 205.498 71.136C205.498 73.632 205.978 75.888 206.938 77.904C207.946 79.92 209.338 81.504 211.114 82.656C212.89 83.76 214.906 84.312 217.162 84.312Z"
        fill="#212121"
      />
      <path
        d="M278.957 71.136C278.957 74.88 278.117 78.24 276.437 81.216C274.757 84.192 272.453 86.52 269.525 88.2C266.645 89.88 263.453 90.72 259.949 90.72C256.445 90.72 253.229 89.88 250.301 88.2C247.421 86.52 245.141 84.192 243.461 81.216C241.781 78.24 240.941 74.88 240.941 71.136C240.941 67.392 241.781 64.008 243.461 60.984C245.141 57.96 247.421 55.608 250.301 53.928C253.229 52.248 256.445 51.408 259.949 51.408C263.453 51.408 266.645 52.248 269.525 53.928C272.453 55.608 274.757 57.96 276.437 60.984C278.117 64.008 278.957 67.392 278.957 71.136ZM272.117 71.136C272.117 68.544 271.565 66.24 270.461 64.224C269.405 62.16 267.941 60.576 266.069 59.472C264.245 58.32 262.205 57.744 259.949 57.744C257.693 57.744 255.629 58.32 253.757 59.472C251.933 60.576 250.469 62.16 249.365 64.224C248.309 66.24 247.781 68.544 247.781 71.136C247.781 73.68 248.309 75.96 249.365 77.976C250.469 79.992 251.933 81.576 253.757 82.728C255.629 83.832 257.693 84.384 259.949 84.384C262.205 84.384 264.245 83.832 266.069 82.728C267.941 81.576 269.405 79.992 270.461 77.976C271.565 75.96 272.117 73.68 272.117 71.136Z"
        fill="#212121"
      />
      <path
        d="M297.133 58.968V80.424C297.133 82.824 298.213 84.024 300.373 84.024C300.709 84.024 301.165 83.952 301.741 83.808C302.317 83.616 302.773 83.52 303.109 83.52C303.733 83.52 304.261 83.784 304.693 84.312C305.125 84.84 305.341 85.512 305.341 86.328C305.341 87.336 304.765 88.2 303.613 88.92C302.461 89.64 301.165 90 299.725 90C298.141 90 296.677 89.832 295.333 89.496C294.037 89.16 292.861 88.32 291.805 86.976C290.797 85.584 290.293 83.496 290.293 80.712V58.968H286.117C285.205 58.968 284.437 58.68 283.813 58.104C283.237 57.48 282.949 56.712 282.949 55.8C282.949 54.888 283.237 54.144 283.813 53.568C284.437 52.992 285.205 52.704 286.117 52.704H290.293V46.656C290.293 45.696 290.605 44.88 291.229 44.208C291.901 43.536 292.741 43.2 293.749 43.2C294.709 43.2 295.501 43.536 296.125 44.208C296.797 44.88 297.133 45.696 297.133 46.656V52.704H303.109C304.021 52.704 304.765 53.016 305.341 53.64C305.965 54.216 306.277 54.96 306.277 55.872C306.277 56.784 305.965 57.528 305.341 58.104C304.765 58.68 304.021 58.968 303.109 58.968H297.133Z"
        fill="#212121"
      />
      <path
        d="M324.484 58.968V80.424C324.484 82.824 325.564 84.024 327.724 84.024C328.06 84.024 328.516 83.952 329.092 83.808C329.668 83.616 330.124 83.52 330.46 83.52C331.084 83.52 331.612 83.784 332.044 84.312C332.476 84.84 332.692 85.512 332.692 86.328C332.692 87.336 332.116 88.2 330.964 88.92C329.812 89.64 328.516 90 327.076 90C325.492 90 324.028 89.832 322.684 89.496C321.388 89.16 320.212 88.32 319.156 86.976C318.148 85.584 317.644 83.496 317.644 80.712V58.968H313.468C312.556 58.968 311.788 58.68 311.164 58.104C310.588 57.48 310.3 56.712 310.3 55.8C310.3 54.888 310.588 54.144 311.164 53.568C311.788 52.992 312.556 52.704 313.468 52.704H317.644V46.656C317.644 45.696 317.956 44.88 318.58 44.208C319.252 43.536 320.092 43.2 321.1 43.2C322.06 43.2 322.852 43.536 323.476 44.208C324.148 44.88 324.484 45.696 324.484 46.656V52.704H330.46C331.372 52.704 332.116 53.016 332.692 53.64C333.316 54.216 333.628 54.96 333.628 55.872C333.628 56.784 333.316 57.528 332.692 58.104C332.116 58.68 331.372 58.968 330.46 58.968H324.484Z"
        fill="#212121"
      />
      <path
        d="M374.38 69.696C374.332 70.56 373.972 71.304 373.3 71.928C372.628 72.504 371.836 72.792 370.924 72.792H345.58C345.916 76.296 347.236 79.104 349.54 81.216C351.892 83.328 354.748 84.384 358.108 84.384C360.412 84.384 362.284 84.048 363.724 83.376C365.164 82.704 366.436 81.84 367.54 80.784C368.26 80.352 368.956 80.136 369.628 80.136C370.444 80.136 371.116 80.424 371.644 81C372.22 81.576 372.508 82.248 372.508 83.016C372.508 84.024 372.028 84.936 371.068 85.752C369.676 87.144 367.828 88.32 365.524 89.28C363.22 90.24 360.868 90.72 358.468 90.72C354.58 90.72 351.148 89.904 348.172 88.272C345.244 86.64 342.964 84.36 341.332 81.432C339.748 78.504 338.956 75.192 338.956 71.496C338.956 67.464 339.772 63.936 341.404 60.912C343.084 57.84 345.268 55.488 347.956 53.856C350.692 52.224 353.62 51.408 356.74 51.408C359.812 51.408 362.692 52.2 365.38 53.784C368.068 55.368 370.228 57.552 371.86 60.336C373.492 63.12 374.332 66.24 374.38 69.696ZM356.74 57.744C354.052 57.744 351.724 58.512 349.756 60.048C347.788 61.536 346.492 63.864 345.868 67.032H367.108V66.456C366.868 63.912 365.716 61.824 363.652 60.192C361.636 58.56 359.332 57.744 356.74 57.744Z"
        fill="#212121"
      />
      <path
        d="M412.923 36.72C413.931 36.72 414.747 37.056 415.371 37.728C416.043 38.352 416.379 39.168 416.379 40.176V86.544C416.379 87.504 416.043 88.32 415.371 88.992C414.747 89.664 413.931 90 412.923 90C411.915 90 411.099 89.688 410.475 89.064C409.851 88.392 409.539 87.552 409.539 86.544V84.528C408.339 86.256 406.635 87.72 404.427 88.92C402.267 90.12 399.939 90.72 397.443 90.72C394.179 90.72 391.227 89.88 388.587 88.2C385.947 86.52 383.859 84.192 382.323 81.216C380.787 78.192 380.019 74.808 380.019 71.064C380.019 67.32 380.763 63.96 382.251 60.984C383.787 57.96 385.875 55.608 388.515 53.928C391.155 52.248 394.059 51.408 397.227 51.408C399.771 51.408 402.123 51.936 404.283 52.992C406.443 54.048 408.195 55.416 409.539 57.096V40.176C409.539 39.168 409.851 38.352 410.475 37.728C411.099 37.056 411.915 36.72 412.923 36.72ZM398.235 84.384C400.491 84.384 402.483 83.808 404.211 82.656C405.987 81.504 407.355 79.92 408.315 77.904C409.323 75.888 409.827 73.608 409.827 71.064C409.827 68.568 409.323 66.312 408.315 64.296C407.355 62.232 405.987 60.624 404.211 59.472C402.483 58.32 400.491 57.744 398.235 57.744C395.979 57.744 393.963 58.32 392.187 59.472C390.459 60.624 389.091 62.232 388.083 64.296C387.123 66.312 386.643 68.568 386.643 71.064C386.643 73.608 387.123 75.888 388.083 77.904C389.091 79.92 390.459 81.504 392.187 82.656C393.963 83.808 395.979 84.384 398.235 84.384Z"
        fill="#212121"
      />
      <path
        d="M480.934 83.448C481.942 83.448 482.758 83.76 483.382 84.384C484.054 84.96 484.39 85.728 484.39 86.688C484.39 87.648 484.054 88.44 483.382 89.064C482.71 89.688 481.894 90 480.934 90H448.102C447.094 90 446.23 89.664 445.51 88.992C444.838 88.272 444.502 87.48 444.502 86.616C444.502 85.848 444.766 85.128 445.294 84.456L474.67 46.152H450.55C449.542 46.152 448.702 45.84 448.03 45.216C447.406 44.592 447.094 43.8 447.094 42.84C447.094 41.88 447.406 41.112 448.03 40.536C448.702 39.912 449.542 39.6 450.55 39.6H481.366C482.326 39.6 483.19 39.936 483.958 40.608C484.726 41.232 485.11 42.024 485.11 42.984C485.11 43.656 484.846 44.376 484.318 45.144L454.942 83.448H480.934Z"
        fill="#212121"
      />
      <path
        d="M525.834 69.696C525.786 70.56 525.426 71.304 524.754 71.928C524.082 72.504 523.29 72.792 522.378 72.792H497.034C497.37 76.296 498.69 79.104 500.994 81.216C503.346 83.328 506.202 84.384 509.562 84.384C511.866 84.384 513.738 84.048 515.178 83.376C516.618 82.704 517.89 81.84 518.994 80.784C519.714 80.352 520.41 80.136 521.082 80.136C521.898 80.136 522.57 80.424 523.098 81C523.674 81.576 523.962 82.248 523.962 83.016C523.962 84.024 523.482 84.936 522.522 85.752C521.13 87.144 519.282 88.32 516.978 89.28C514.674 90.24 512.322 90.72 509.922 90.72C506.034 90.72 502.602 89.904 499.626 88.272C496.698 86.64 494.418 84.36 492.786 81.432C491.202 78.504 490.41 75.192 490.41 71.496C490.41 67.464 491.226 63.936 492.858 60.912C494.538 57.84 496.722 55.488 499.41 53.856C502.146 52.224 505.074 51.408 508.194 51.408C511.266 51.408 514.146 52.2 516.834 53.784C519.522 55.368 521.682 57.552 523.314 60.336C524.946 63.12 525.786 66.24 525.834 69.696ZM508.194 57.744C505.506 57.744 503.178 58.512 501.21 60.048C499.242 61.536 497.946 63.864 497.322 67.032H518.562V66.456C518.322 63.912 517.17 61.824 515.106 60.192C513.09 58.56 510.786 57.744 508.194 57.744Z"
        fill="#212121"
      />
      <path
        d="M552.712 51.408C555.976 51.408 558.928 52.248 561.568 53.928C564.208 55.608 566.272 57.936 567.76 60.912C569.296 63.888 570.064 67.248 570.064 70.992C570.064 74.736 569.296 78.12 567.76 81.144C566.272 84.168 564.208 86.52 561.568 88.2C558.928 89.88 556.024 90.72 552.856 90.72C550.36 90.72 548.032 90.168 545.872 89.064C543.712 87.96 541.96 86.592 540.616 84.96V87.048C540.616 88.008 540.28 88.824 539.608 89.496C538.984 90.168 538.168 90.504 537.16 90.504C536.2 90.504 535.384 90.192 534.712 89.568C534.088 88.896 533.776 88.056 533.776 87.048V40.176C533.776 39.168 534.088 38.352 534.712 37.728C535.336 37.056 536.152 36.72 537.16 36.72C538.168 36.72 538.984 37.056 539.608 37.728C540.28 38.4 540.616 39.216 540.616 40.176V57.744C541.768 56.016 543.448 54.528 545.656 53.28C547.864 52.032 550.216 51.408 552.712 51.408ZM551.92 84.384C554.128 84.384 556.12 83.808 557.896 82.656C559.672 81.456 561.04 79.848 562 77.832C563.008 75.768 563.512 73.488 563.512 70.992C563.512 68.496 563.008 66.24 562 64.224C561.04 62.208 559.672 60.624 557.896 59.472C556.12 58.32 554.128 57.744 551.92 57.744C549.664 57.744 547.648 58.32 545.872 59.472C544.096 60.624 542.704 62.208 541.696 64.224C540.736 66.192 540.256 68.448 540.256 70.992C540.256 73.536 540.736 75.816 541.696 77.832C542.704 79.848 544.096 81.456 545.872 82.656C547.648 83.808 549.664 84.384 551.92 84.384Z"
        fill="#212121"
      />
      <path
        d="M596.795 51.408C598.043 51.408 599.123 51.744 600.035 52.416C600.947 53.04 601.403 53.832 601.403 54.792C601.403 55.944 601.091 56.832 600.467 57.456C599.891 58.032 599.171 58.32 598.307 58.32C597.875 58.32 597.227 58.176 596.363 57.888C595.355 57.552 594.563 57.384 593.987 57.384C592.499 57.384 591.035 57.912 589.595 58.968C588.203 59.976 587.051 61.392 586.139 63.216C585.275 64.992 584.843 66.984 584.843 69.192V86.544C584.843 87.504 584.507 88.32 583.835 88.992C583.211 89.664 582.395 90 581.387 90C580.379 90 579.563 89.688 578.939 89.064C578.315 88.392 578.003 87.552 578.003 86.544V55.728C578.003 54.768 578.315 53.952 578.939 53.28C579.611 52.608 580.427 52.272 581.387 52.272C582.395 52.272 583.211 52.608 583.835 53.28C584.507 53.952 584.843 54.768 584.843 55.728V59.4C585.899 57.048 587.483 55.152 589.595 53.712C591.707 52.224 594.107 51.456 596.795 51.408Z"
        fill="#212121"
      />
      <path
        d="M637.501 51.768C638.509 51.768 639.325 52.104 639.949 52.776C640.621 53.4 640.957 54.24 640.957 55.296V86.544C640.957 87.504 640.621 88.32 639.949 88.992C639.325 89.664 638.509 90 637.501 90C636.493 90 635.677 89.688 635.053 89.064C634.429 88.392 634.117 87.552 634.117 86.544V84.672C632.869 86.352 631.165 87.792 629.005 88.992C626.845 90.144 624.517 90.72 622.021 90.72C618.757 90.72 615.781 89.88 613.093 88.2C610.453 86.52 608.365 84.192 606.829 81.216C605.341 78.192 604.597 74.808 604.597 71.064C604.597 67.32 605.341 63.96 606.829 60.984C608.365 57.96 610.453 55.608 613.093 53.928C615.733 52.248 618.637 51.408 621.805 51.408C624.349 51.408 626.701 51.936 628.861 52.992C631.069 54.048 632.821 55.392 634.117 57.024V55.296C634.117 54.288 634.429 53.448 635.053 52.776C635.677 52.104 636.493 51.768 637.501 51.768ZM622.813 84.384C625.069 84.384 627.061 83.808 628.789 82.656C630.565 81.504 631.933 79.92 632.893 77.904C633.901 75.888 634.405 73.608 634.405 71.064C634.405 68.568 633.901 66.312 632.893 64.296C631.933 62.28 630.565 60.696 628.789 59.544C627.061 58.344 625.069 57.744 622.813 57.744C620.557 57.744 618.541 58.32 616.765 59.472C615.037 60.624 613.669 62.208 612.661 64.224C611.701 66.24 611.221 68.52 611.221 71.064C611.221 73.608 611.701 75.888 612.661 77.904C613.669 79.92 615.037 81.504 616.765 82.656C618.541 83.808 620.557 84.384 622.813 84.384Z"
        fill="#212121"
      />
    </svg>
  );
};

export default SpottedZebraLogo;
