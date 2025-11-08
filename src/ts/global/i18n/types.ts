export type localeKey = 'zh-CN' | 'en-US';

//json语言文件的结构类型
export type langsStruType = {
    global:{
        mjyy:string;
    },
    index:{
        head:{
            title:string;
            description:string;
        },
        preloader:{
            loading:string;
            skipbt:string;
            bgon:string;
            bgoff:string;
        },
        navbar:{
            video_page:string;
            photo:string;
            introduce:string;
            rule:string;
            join_us:string;
            more:string;
            community_photo_wall:string;
            community_photo_wall_title:string;
            share:string;
            share_title:string;
            share_page:{
                title:string;
                description:string;
                wechat_qrcode_title:string;
                wechat_qrcode_helper:{
                    span1:string;
                    span2:string;
                }
            }
            game:string;
            defender:string;
            defender_title:string;
        },
        home:{
            main_text:string;
            main_button_text:string;
            ping_server:{
                code:{
                    id0:string;
                    id1:string;
                    id2:string;
                    id3:string;
                    id4:string;
                    id5:string;
                    id6:string;
                    id7:string;
                    player_online_num:string;
                    player_online_num2:string;
                    no_check:string;
                }
            },
            lang:{
                zh_cn:string;
                en_us:string;
            },
            resource_mode:{
                source:string;
                normal:string;
                low:string;
            },
            effect_check_box:string;
        },
        video_page:{
            header:string;
            do_not_load:string;
        },
        photo:{
            header:string;
            title1:string;
            title2:string;
            title3:string;
            big_video_for_image_alt:string;
        },
        introduce:{
            header:string;
            markdown_path:{
                server_introductory:string;
            }
        },
        rule:{
            header:string;
            markdown_path:{
                server_rule:string;
            }
        },
        join_us:{
            header1:string;
            header2:string;
            join_qqgroup:string;
            join_qqdiscord:string;
            markdown_path:{
                join_us:string;
                join_us2:string;
            }
        }
    }
};

//生成所有翻译键的路径，可无限嵌套
export type Paths<T> = T extends object
    ? {
        [K in keyof T]: K extends string
            ? T[K] extends string
                ? K
                : `${K}.${Paths<T[K]>}`
            : never;
    }[keyof T]
    : never;

//翻译键类型，用于路径拼写检查
export type translationKey = Paths<langsStruType>;