import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/** 博客信息，包含路径和frontmatter */
export type BlogInfo = {
  path: string
  frontmatter: Record<string, any>
}


/**
 * 递归获取指定目录下的MD文件的路径及frontmatter信息
 * @param dir 路径
 * @return
 */
export function getMDFilesWithFrontmatter(dir: string): { blogInfos: BlogInfo[], tags: Record<string, number> } {
  const files = fs.readdirSync(dir)
  let blogInfos: BlogInfo[] = []
  let tags: Record<string, number> = {}

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // 如果是目录，递归调用该函数
      blogInfos = blogInfos.concat(getMDFilesWithFrontmatter(filePath).blogInfos)
    } else if (path.extname(file) === '.md') {
      // 如果是md文件，则解析frontmatter
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data: frontmatter } = matter(fileContent)

      // 保存文章标签
      for (const tag of frontmatter.tags) {
        if (tag in tags) {
          tags[tag] += 1
        } else {
          tags[tag] = 1
        }
      }

      blogInfos.push({ path: filePath.split('.md')[0], frontmatter })
    }
  })

  return {
    blogInfos: blogInfos,
    tags: tags
  }
}