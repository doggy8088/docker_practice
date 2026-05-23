const { config } = require('vuepress-theme-hope')

module.exports = config({
  title: 'Docker 從入門到實踐',
  base: '/',
  head: [['script', {}, `
  var _hmt = _hmt || [];
  (function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?81a3490c9cd141dbcf6d00bc18b6edae";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
  })();
`],
  [
    'script', {}, `
  (function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
  `
  ]
  ],
  plugins: {
    // sitemap: {
    //   hostname: 'https://docker-practice.gh.miniasp.com'
    // },
    // 'git-log': {
    //   additionalArgs: '--no-merge',
    //   onlyFirstAndLastCommit: true,
    // },
  },
  locales: {
    "/": {
      lang: "zh-CN"
    }
  },
  themeConfig: {
    blog: false,
    // comment: false,
    comment: {
      type: "disable", // 使用 Valine
      appId: "...", // your appId
      appKey: "...", // your appKey
    },
    pageInfo: [
      // 'author',
      'reading-time',
      'word',
    ],
    footer: {
      content: "Made with <a target='_blank' href='https://github.com/vuepress-theme-hope/vuepress-theme-hope'>vuepress-theme-hope</a>",
      display: true,
      copyright: false,
    },
    searchPlaceholder: 'Search',
    repo: 'doggy8088/docker_practice',
    repoLabel: 'GitHub',
    repoDisplay: true,
    hostname: 'https://docker-practice.gh.miniasp.com',
    // author: 'yeasy',
    mdEnhance: {
      lineNumbers: true,
    },
    git: {
      contributor: false,
    },
    themeColor: {
      blue: '#2196f3',
      // red: '#f26d6d',
      // green: '#3eaf7c',
      // orange: '#fb9b5f'
    },
    locales: {
      "/": {
        lang: "zh-CN"
      }
    },

    darkmode: 'auto-switch',

    //

    showAds: true,

    docsRepo: 'doggy8088/docker_practice',
    docsDir: '/',
    docsBranch: 'zh-tw',
    editLinks: true,
    nav: [
      {
        text: '微信交流群',
        link: 'https://docker-practice.gh.miniasp.com/pic/dpsig-wechat.jpg',
      },
      {
        text: '小程式',
        link: 'https://docker-practice.gh.miniasp.com/pic/dp-wechat-miniprogram.jpg',
      },
      {
        text: '安裝 Docker',
        link: '/03_install/',
      },
      {
        text: 'Docker 入門',
        link: '/'
      },
      {
        text: 'Docker 實戰',
        link: '/15_cases/os/'
      },
      {
        text: 'CI/CD',
        link: '/15_cases/ci/'
      },
      {
        text: 'Compose',
        link: '/10_compose/',
      },
      {
        text: 'Kubernetes',
        link: '/12_orchestration/kubernetes/',
      },
      {
        text: "雲端運算",
        link: "/13_ecosystem/cloud/",
      },
      // {
      //   text: 'GitHub',
      //   link: 'https://github.com/doggy8088/docker_practice'
      // },
      // {
      //   text: '捐贈',
      //   link: ''
      // },
      {
        text: '雲服務器99/元首年特惠',
        link: 'https://cloud.tencent.com/act/cps/redirect?redirect=1062&cps_key=3a5255852d5db99dcd5da4c72f05df61&from=console'
      },
      // {
      //   text: '語言',
      //   items: [{
      //     text: 'English',
      //     link: ''
      //   }]
      // }
    ],
    sidebar: "auto",
    legacySidebar: {
      '/cloud/': [
        'intro',
        'tencentCloud',
        'alicloud',
        'aws',
        'summary',
      ],
      '/kubernetes/': [
        'intro',
        'concepts',
        'design',
        {
          title: "部署 Kubernetes",
          collapsable: true,
          children: [
            "setup/",
            "setup/kubeadm",
            "setup/docker-desktop",
            "setup/systemd",
            "setup/dashboard",
          ]
        },
        {
          title: "Kubernetes 指令行 kubectl",
          collapsable: true,
          children: [
            'kubectl/'
          ]
        }
      ],
      '/compose/': [
        'introduction',
        'v2',
        'install',
        'usage',
        'commands',
        'compose_file',
        'django',
        'rails',
        'wordpress',
        'lnmp',
      ],
      '/install/': [
        'ubuntu',
        'debian',
        'fedora',
        'centos',
        'raspberry-pi',
        // 'offline',
        'mac',
        'windows',
        'mirror',
        'experimental',
      ],
      '/cases/os/': [
        {
          title: "作業系統",
          collapsable: false,
          children: [
            'busybox',
            'alpine',
            'debian',
            'centos',
            'summary',
          ],
        },
        {
          title: "在 IDE 中使用 Docker",
          collapsable: false,
          children: [
            '/ide/',
            '/ide/vsCode',
          ],
        },
      ],
      '/cases/ci/': [
        'actions/',
        {
          title: "Drone",
          collapsable: true,
          children: [
            'drone/',
            'drone/install'
          ]
        },
      ],
      '/': [
        '/',
        '/CHANGELOG',
        '/CONTRIBUTING',
        {
          title: "Docker 簡介",
          collapsable: false,
          children: [
            'introduction/',
            'introduction/what',
            'introduction/why',
          ]
        }, {
          title: "基本概念",
          collapsable: false,
          children: [
            'basic_concept/',
            'basic_concept/image',
            'basic_concept/container',
            'basic_concept/repository'
          ]
        },
        {
          title: "使用映象",
          collapsable: false,
          children: [
            'image/',
            'image/pull',
            'image/list',
            'image/rm',
            'image/commit',
            'image/build',
            'image/other.md',
            'image/internal.md',
          ]
        },
        {
          title: 'Dockerfile',
          collapsable: true,
          children: [
            "image/dockerfile/",
            'image/dockerfile/copy',
            'image/dockerfile/add',
            'image/dockerfile/cmd',
            'image/dockerfile/entrypoint',
            'image/dockerfile/env',
            'image/dockerfile/arg',
            'image/dockerfile/volume',
            'image/dockerfile/expose',
            'image/dockerfile/workdir',
            'image/dockerfile/user',
            'image/dockerfile/healthcheck',
            'image/dockerfile/label',
            'image/dockerfile/shell',
            'image/dockerfile/onbuild',
            'image/dockerfile/references',
            'image/dockerfile/7.17_multistage_builds.md',
            'image/dockerfile/7.18_multistage_builds_laravel.md',
            'image/manifest',
          ]
        }, {
          title: "操作容器",
          collapsable: false,
          children: [
            'container/',
            'container/run',
            'container/daemon',
            'container/stop',
            'container/attach_exec',
            'container/import_export',
            'container/rm',
          ],
        },
        {
          title: "Docker 倉庫",
          collapsable: false,
          children: [
            'repository/',
            'repository/dockerhub',
            'repository/registry',
            'repository/registry_auth',
            'repository/nexus3_registry',
          ],
        },
        {
          title: "資料管理",
          collapsable: false,
          children: [
            'data_management/',
            'data_management/volume',
            'data_management/bind-mounts',
          ],
        }, {
          title: "使用網路",
          collapsable: false,
          children: [
            'network/',
            'network/port_mapping',
            'network/linking',
            'network/dns',
          ],
        },
        {
          title: "高階網路設定",
          collapsable: true,
          children: [
            'advanced_network/',
            'advanced_network/quick_guide',
            'advanced_network/access_control',
            'advanced_network/port_mapping',
            'advanced_network/bridge',
            'advanced_network/example',
            'advanced_network/config_file',
            'advanced_network/ptp',
          ],
        },
        {
          title: "Swarm mode",
          collapsable: true,
          children: [
            'swarm_mode/',
            'swarm_mode/overview',
            'swarm_mode/create',
            'swarm_mode/deploy',
            'swarm_mode/stack',
            'swarm_mode/secret',
            'swarm_mode/config',
            'swarm_mode/rolling_update',
          ],
        },
        {
          title: "安全",
          collapsable: true,
          children: [
            'security/',
            'security/kernel_ns',
            'security/control_group',
            'security/daemon_sec',
            'security/kernel_capability',
            'security/other_feature',
            'security/summary',
          ],
        },
        {
          title: "底層實現",
          collapsable: true,
          children: [
            'underly/',
            'underly/arch',
            'underly/namespace',
            'underly/cgroups',
            'underly/ufs',
            'underly/container_format',
            'underly/network',
          ],
        },
        {
          title: "Docker Buildx",
          collapsable: false,
          children: [
            "buildx/",
            "buildx/buildkit",
            "buildx/buildx",
            "buildx/multi-arch-images",
          ],
        },
        {
          title: "Etcd",
          collapsable: true,
          children: [
            'etcd/',
            'etcd/intro',
            'etcd/install',
            'etcd/cluster',
            'etcd/etcdctl',
          ],
        },
        {
          title: "Fedora CoreOS",
          collapsable: true,
          children: [
            'coreos/',
            'coreos/intro',
            'coreos/install',
          ],
        },
        'podman/',
        'appendix/faq/',
        {
          title: "熱門映象介紹",
          collapsable: true,
          children: [
            'appendix/repo/',
            'appendix/repo/ubuntu',
            'appendix/repo/centos',
            'appendix/repo/nginx',
            'appendix/repo/php',
            'appendix/repo/nodejs',
            'appendix/repo/mysql',
            'appendix/repo/wordpress',
            'appendix/repo/mongodb',
            'appendix/repo/redis',
            'appendix/repo/minio',
          ],
        },
        {
          title: "Docker 指令",
          collapsable: true,
          children: [
            'appendix/command/',
            'appendix/command/docker',
            'appendix/command/dockerd',
          ]
        },
        'appendix/best_practices',
        'appendix/debug',
        'appendix/resources',
      ],
    },
  }
});
