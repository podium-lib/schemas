# [5.0.0-next.4](https://github.com/podium-lib/schemas/compare/v5.0.0-next.3...v5.0.0-next.4) (2021-04-25)


### Bug Fixes

* Use ESM workaround for dirname to find path to schema ([#113](https://github.com/podium-lib/schemas/issues/113)) ([ed40808](https://github.com/podium-lib/schemas/commit/ed408081e4c56e4ba794839459331d5454e0c5f3))

# [5.0.0-next.3](https://github.com/podium-lib/schemas/compare/v5.0.0-next.2...v5.0.0-next.3) (2021-04-25)


### Bug Fixes

* Optimize the npm package ([#112](https://github.com/podium-lib/schemas/issues/112)) ([149ce28](https://github.com/podium-lib/schemas/commit/149ce28a9cd89c625c0a8ead1127e0c07d368cbb))

# [5.0.0-next.2](https://github.com/podium-lib/schemas/compare/v5.0.0-next.1...v5.0.0-next.2) (2021-04-25)


### Bug Fixes

* **deps:** update dependency ajv to v6.12.4 ([9d32b74](https://github.com/podium-lib/schemas/commit/9d32b74a0cc3a35e336fe2a01b90ab6add2779b2))
* **deps:** update dependency ajv to v6.12.5 ([087631b](https://github.com/podium-lib/schemas/commit/087631bfb8d759ab44164e99d0df9880ec1f2881))
* **deps:** update dependency ajv to v6.12.6 ([3ae65d3](https://github.com/podium-lib/schemas/commit/3ae65d34432ca7c14c1e142c28604566521b2b5b))
* **deps:** update dependency ajv to v7 ([#83](https://github.com/podium-lib/schemas/issues/83)) ([586f481](https://github.com/podium-lib/schemas/commit/586f4814fabef2ea5bfb86a288688d862c046e9e))
* **deps:** update dependency ajv to v7.0.3 ([38e48cd](https://github.com/podium-lib/schemas/commit/38e48cde49c4c746f408b605afc55ef76b8bdadb))
* **deps:** update dependency ajv to v7.0.4 ([6f8b024](https://github.com/podium-lib/schemas/commit/6f8b0245ad98f221332bb4a2db660c677d2130ab))
* **deps:** update dependency ajv to v7.1.0 ([a53d312](https://github.com/podium-lib/schemas/commit/a53d312464f6e378c71ef7a4b3da33b40ee9bf67))
* **deps:** update dependency ajv to v7.1.1 ([38be8ca](https://github.com/podium-lib/schemas/commit/38be8cad63716f2a78538aea9935c39511a4d2ee))
* **deps:** update dependency ajv to v7.2.0 ([1565373](https://github.com/podium-lib/schemas/commit/1565373eee48eacb24c44c813bd2703ab30d33e2))
* **deps:** update dependency ajv to v7.2.1 ([8ec39f8](https://github.com/podium-lib/schemas/commit/8ec39f8a7b015680107d6bf4f64c641b35ef4321))
* **deps:** update dependency ajv to v7.2.3 ([3c1196a](https://github.com/podium-lib/schemas/commit/3c1196afddf67100d6bf64c9a70ca199093086a3))
* **deps:** update dependency ajv to v7.2.4 ([cdcc6cc](https://github.com/podium-lib/schemas/commit/cdcc6cc52bfee91cabe47e8c3b3ab66c14e7e952))
* **deps:** update dependency ajv to v8.0.2 ([92fd51f](https://github.com/podium-lib/schemas/commit/92fd51f92d9a2d077ddfadec8f99e08f49291223))
* **deps:** update dependency ajv to v8.0.3 ([451974a](https://github.com/podium-lib/schemas/commit/451974ab7d88cb488f5683d636bbb22637013e6f))
* **deps:** update dependency ajv to v8.0.4 ([1b26d73](https://github.com/podium-lib/schemas/commit/1b26d739e43a7162ef5f22875758c75ffa936de0))
* **deps:** update dependency ajv to v8.0.5 ([f4375d0](https://github.com/podium-lib/schemas/commit/f4375d070bc8875afc238cc0916b322ed923c698))
* **deps:** update dependency ajv to v8.1.0 ([#107](https://github.com/podium-lib/schemas/issues/107)) ([1d76bb6](https://github.com/podium-lib/schemas/commit/1d76bb617e90a31adbd36b16829c97be1c797bb0))
* **deps:** update dependency ajv-formats to v1.6.0 ([69bb585](https://github.com/podium-lib/schemas/commit/69bb5850ff7c1f9166b2bfed2a3c16ca15d0f473))
* **deps:** update dependency ajv-formats to v2.0.2 ([5c4cbfb](https://github.com/podium-lib/schemas/commit/5c4cbfb6e0f372b518dc08773949a5bc8bf9837b))
* Updated ajv dependencies ([#102](https://github.com/podium-lib/schemas/issues/102)) ([a3dae05](https://github.com/podium-lib/schemas/commit/a3dae054df783746274a468b66a39e31d1358056))


### Features

* Add css and js html attributes to schema ([#88](https://github.com/podium-lib/schemas/issues/88)) ([1db6f63](https://github.com/podium-lib/schemas/commit/1db6f632d63337e25f68f7c0ff80cd15a61a33a3))
* Convert to ESM ([#64](https://github.com/podium-lib/schemas/issues/64)) ([197fe2b](https://github.com/podium-lib/schemas/commit/197fe2bf269b625748fb1797eb455a0db46fa0e1)), closes [#83](https://github.com/podium-lib/schemas/issues/83) [#81](https://github.com/podium-lib/schemas/issues/81) [#83](https://github.com/podium-lib/schemas/issues/83) [#88](https://github.com/podium-lib/schemas/issues/88) [#88](https://github.com/podium-lib/schemas/issues/88) [#96](https://github.com/podium-lib/schemas/issues/96) [#102](https://github.com/podium-lib/schemas/issues/102) [#102](https://github.com/podium-lib/schemas/issues/102) [#106](https://github.com/podium-lib/schemas/issues/106)


### BREAKING CHANGES

* Convert from CommonJS module to ESM

* dev dependency tap updated to version 14.10.8

* fix(deps): update dependency ajv to v6.12.4

* chore(release): 4.0.3 [skip ci]

## [4.0.3](https://github.com/podium-lib/schemas/compare/v4.0.2...v4.0.3) (2020-08-15)

### Bug Fixes

* **deps:** update dependency ajv to v6.12.4 ([9d32b74](https://github.com/podium-lib/schemas/commit/9d32b74a0cc3a35e336fe2a01b90ab6add2779b2))

* dev dependency @semantic-release/npm updated to version 7.0.6

* fix(deps): update dependency ajv to v6.12.5

* chore(release): 4.0.4 [skip ci]

## [4.0.4](https://github.com/podium-lib/schemas/compare/v4.0.3...v4.0.4) (2020-09-13)

### Bug Fixes

* **deps:** update dependency ajv to v6.12.5 ([087631b](https://github.com/podium-lib/schemas/commit/087631bfb8d759ab44164e99d0df9880ec1f2881))

* dev dependency @semantic-release/github updated to version 7.1.1

* dev dependency semantic-release updated to version 17.1.2

* dev dependency eslint updated to version 7.10.0

* fix(deps): update dependency ajv to v6.12.6

* chore(release): 4.0.5 [skip ci]

## [4.0.5](https://github.com/podium-lib/schemas/compare/v4.0.4...v4.0.5) (2020-10-10)

### Bug Fixes

* **deps:** update dependency ajv to v6.12.6 ([3ae65d3](https://github.com/podium-lib/schemas/commit/3ae65d34432ca7c14c1e142c28604566521b2b5b))

* dev dependency eslint updated to version 7.11.0

* dev dependency eslint updated to version 7.12.0

* dev dependency eslint updated to version 7.12.1

* dev dependency eslint updated to version 7.13.0

* dev dependency @semantic-release/github updated to version 7.1.2

* dev dependency semantic-release updated to version 17.2.3

* dev dependency @semantic-release/github updated to version 7.2.0

* dev dependency eslint updated to version 7.15.0

* dev dependency eslint-plugin-prettier updated to version 3.3.0

* dev dependency @semantic-release/npm updated to version 7.0.9

* Dev dependency tap updated to version 14.11.0

* Dev dependency eslint updated to version 7.17.0

# [5.0.0-next.1](https://github.com/podium-lib/schemas/compare/v4.0.3-next.1...v5.0.0-next.1) (2020-07-11)


### chore

* Remove .assets.js and .assets.css ([#62](https://github.com/podium-lib/schemas/issues/62)) ([6468f69](https://github.com/podium-lib/schemas/commit/6468f69b7d51cffef06d9d5c2d7d05b67b1af575))


### BREAKING CHANGES

* .assets.js and .assets.css is now replaced by .js and .css

Resolves: https://github.com/podium-lib/issues/issues/26

Co-authored-by: Trygve Lie <trygve.lie@finn.no>

## [4.0.3-next.1](https://github.com/podium-lib/schemas/compare/v4.0.2...v4.0.3-next.1) (2020-07-11)
## [4.1.15](https://github.com/podium-lib/schemas/compare/v4.1.14...v4.1.15) (2021-04-11)


### Bug Fixes

* **deps:** update dependency ajv to v8.1.0 ([#107](https://github.com/podium-lib/schemas/issues/107)) ([1d76bb6](https://github.com/podium-lib/schemas/commit/1d76bb617e90a31adbd36b16829c97be1c797bb0))

## [4.1.14](https://github.com/podium-lib/schemas/compare/v4.1.13...v4.1.14) (2021-04-02)


### Bug Fixes

* **deps:** update dependency ajv to v8.0.5 ([f4375d0](https://github.com/podium-lib/schemas/commit/f4375d070bc8875afc238cc0916b322ed923c698))

## [4.1.13](https://github.com/podium-lib/schemas/compare/v4.1.12...v4.1.13) (2021-04-02)


### Bug Fixes

* **deps:** update dependency ajv to v8.0.4 ([1b26d73](https://github.com/podium-lib/schemas/commit/1b26d739e43a7162ef5f22875758c75ffa936de0))

## [4.1.12](https://github.com/podium-lib/schemas/compare/v4.1.11...v4.1.12) (2021-04-02)


### Bug Fixes

* **deps:** update dependency ajv-formats to v2.0.2 ([5c4cbfb](https://github.com/podium-lib/schemas/commit/5c4cbfb6e0f372b518dc08773949a5bc8bf9837b))

## [4.1.11](https://github.com/podium-lib/schemas/compare/v4.1.10...v4.1.11) (2021-04-01)


### Bug Fixes

* **deps:** update dependency ajv to v8.0.3 ([451974a](https://github.com/podium-lib/schemas/commit/451974ab7d88cb488f5683d636bbb22637013e6f))

## [4.1.10](https://github.com/podium-lib/schemas/compare/v4.1.9...v4.1.10) (2021-03-31)


### Bug Fixes

* **deps:** update dependency ajv to v8.0.2 ([92fd51f](https://github.com/podium-lib/schemas/commit/92fd51f92d9a2d077ddfadec8f99e08f49291223))

## [4.1.9](https://github.com/podium-lib/schemas/compare/v4.1.8...v4.1.9) (2021-03-30)


### Bug Fixes

* Updated ajv dependencies ([#102](https://github.com/podium-lib/schemas/issues/102)) ([a3dae05](https://github.com/podium-lib/schemas/commit/a3dae054df783746274a468b66a39e31d1358056))

## [4.1.8](https://github.com/podium-lib/schemas/compare/v4.1.7...v4.1.8) (2021-03-27)


### Bug Fixes

* **deps:** update dependency ajv-formats to v1.6.0 ([69bb585](https://github.com/podium-lib/schemas/commit/69bb5850ff7c1f9166b2bfed2a3c16ca15d0f473))

## [4.1.7](https://github.com/podium-lib/schemas/compare/v4.1.6...v4.1.7) (2021-03-26)


### Bug Fixes

* **deps:** update dependency ajv to v7.2.4 ([cdcc6cc](https://github.com/podium-lib/schemas/commit/cdcc6cc52bfee91cabe47e8c3b3ab66c14e7e952))

## [4.1.6](https://github.com/podium-lib/schemas/compare/v4.1.5...v4.1.6) (2021-03-20)


### Bug Fixes

* **deps:** update dependency ajv to v7.2.3 ([3c1196a](https://github.com/podium-lib/schemas/commit/3c1196afddf67100d6bf64c9a70ca199093086a3))

## [4.1.5](https://github.com/podium-lib/schemas/compare/v4.1.4...v4.1.5) (2021-03-07)


### Bug Fixes

* **deps:** update dependency ajv to v7.2.1 ([8ec39f8](https://github.com/podium-lib/schemas/commit/8ec39f8a7b015680107d6bf4f64c641b35ef4321))

## [4.1.4](https://github.com/podium-lib/schemas/compare/v4.1.3...v4.1.4) (2021-03-07)


### Bug Fixes

* **deps:** update dependency ajv to v7.2.0 ([1565373](https://github.com/podium-lib/schemas/commit/1565373eee48eacb24c44c813bd2703ab30d33e2))

## [4.1.3](https://github.com/podium-lib/schemas/compare/v4.1.2...v4.1.3) (2021-02-17)


### Bug Fixes

* **deps:** update dependency ajv to v7.1.1 ([38be8ca](https://github.com/podium-lib/schemas/commit/38be8cad63716f2a78538aea9935c39511a4d2ee))

## [4.1.2](https://github.com/podium-lib/schemas/compare/v4.1.1...v4.1.2) (2021-02-11)


### Bug Fixes

* **deps:** update dependency ajv to v7.1.0 ([a53d312](https://github.com/podium-lib/schemas/commit/a53d312464f6e378c71ef7a4b3da33b40ee9bf67))

## [4.1.1](https://github.com/podium-lib/schemas/compare/v4.1.0...v4.1.1) (2021-02-01)


### Bug Fixes

* **deps:** update dependency ajv to v7.0.4 ([6f8b024](https://github.com/podium-lib/schemas/commit/6f8b0245ad98f221332bb4a2db660c677d2130ab))

# [4.1.0](https://github.com/podium-lib/schemas/compare/v4.0.7...v4.1.0) (2021-01-22)


### Features

* Add css and js html attributes to schema ([#88](https://github.com/podium-lib/schemas/issues/88)) ([1db6f63](https://github.com/podium-lib/schemas/commit/1db6f632d63337e25f68f7c0ff80cd15a61a33a3))

## [4.0.7](https://github.com/podium-lib/schemas/compare/v4.0.6...v4.0.7) (2021-01-21)


### Bug Fixes

* **deps:** update dependency ajv to v7.0.3 ([38e48cd](https://github.com/podium-lib/schemas/commit/38e48cde49c4c746f408b605afc55ef76b8bdadb))

## [4.0.6](https://github.com/podium-lib/schemas/compare/v4.0.5...v4.0.6) (2021-01-21)


### Bug Fixes

* **deps:** update dependency ajv to v7 ([#83](https://github.com/podium-lib/schemas/issues/83)) ([586f481](https://github.com/podium-lib/schemas/commit/586f4814fabef2ea5bfb86a288688d862c046e9e))

## [4.0.5](https://github.com/podium-lib/schemas/compare/v4.0.4...v4.0.5) (2020-10-10)


### Bug Fixes

* **deps:** update dependency ajv to v6.12.6 ([3ae65d3](https://github.com/podium-lib/schemas/commit/3ae65d34432ca7c14c1e142c28604566521b2b5b))

## [4.0.4](https://github.com/podium-lib/schemas/compare/v4.0.3...v4.0.4) (2020-09-13)


### Bug Fixes

* **deps:** update dependency ajv to v6.12.5 ([087631b](https://github.com/podium-lib/schemas/commit/087631bfb8d759ab44164e99d0df9880ec1f2881))

## [4.0.3](https://github.com/podium-lib/schemas/compare/v4.0.2...v4.0.3) (2020-08-15)


### Bug Fixes

* Initial setup of next branch ([5314940](https://github.com/podium-lib/schemas/commit/53149406b1287c6a7d85dd9cbc7f623eeaaac307))
* **deps:** update dependency ajv to v6.12.4 ([9d32b74](https://github.com/podium-lib/schemas/commit/9d32b74a0cc3a35e336fe2a01b90ab6add2779b2))

# Changelog

Notable changes to this project.

The latest version of this document is always available in [releases][releases-url].

## [Unreleased]

## [3.0.0] - 2019-01-24

-   Initial open source release.

[unreleased]: https://github.com/podium-lib/schemas/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/podium-lib/schemas/releases/tag/v3.0.0
[releases-url]: https://github.com/podium-lib/schemas/blob/master/CHANGELOG.md
